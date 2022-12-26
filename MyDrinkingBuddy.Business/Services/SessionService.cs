using AutoMapper;
using Microsoft.EntityFrameworkCore;
using MyDrinkingBuddy.Common.Dtos;
using MyDrinkingBuddy.Data.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MyDrinkingBuddy.Business.Services
{
    public interface ISessionService
    {
        Task DeleteSession(int sessionId);
        Task AddSessionDrink(SessionDrinkDto sessionDrinkDto);
        Task DeleteSessionDrink(SessionDrinkDto sessionDrinkDto);
        Task<SessionDto> GetSession(int sessionId);
        Task<IEnumerable<SessionDto>> GetSessions();
        Task<int> NewSession();
        Task UpdateSessionDrink(SessionDrinkDto sessionDrinkDto);
    }

    public class SessionService : ISessionService
    {

        private readonly IMapper _mapper;
        private readonly MDBContext _ctx;
        private readonly IUserAuthorizationInfoService _userAuthorizationInfoService;

        public SessionService(IMapper mapper, MDBContext ctx, IUserAuthorizationInfoService userAuthorizationInfoService)
        {
            _mapper = mapper;
            _ctx = ctx;
            _userAuthorizationInfoService = userAuthorizationInfoService;
        }
        public async Task<int> NewSession()
        {
            int userId = _userAuthorizationInfoService.UserId;
            var user = await _ctx.User.FirstOrDefaultAsync(x => x.UserId == userId);

            var session = new Session()
            {
                CreatedBy = _userAuthorizationInfoService.Identity,
                CreatedOn = DateTime.Now,
                UserId = userId,
                Sex = user.Sex,
                Weight = user.Weight
            };
            _ctx.Session.Add(session);
            await _ctx.SaveChangesAsync();
            return session.SessionId;
        }
        public async Task DeleteSession(int sessionId)
        {
            int userId = _userAuthorizationInfoService.UserId;
            var session = await _ctx.Session.Include(x => x.SessionDrink).ThenInclude(x => x.Drink).Where(x => x.UserId == userId).FirstOrDefaultAsync(x => x.SessionId == sessionId);

            _ctx.Session.Remove(session);
            await _ctx.SaveChangesAsync();
        }
        public async Task<SessionDto> GetSession(int sessionId)
        {
            int userId = _userAuthorizationInfoService.UserId;
            var session = await _ctx.Session.Include(x => x.SessionDrink).ThenInclude(x => x.Drink).Where(x => x.UserId == userId).FirstOrDefaultAsync(x => x.SessionId == sessionId);

            var dto = CalculateSession(session);
            if (!dto.Open && dto.CreatedOn > DateTime.Now.AddHours(-1))
            {
                dto.Open = true;
            }
            return dto;
        }

        public async Task<IEnumerable<SessionDto>> GetSessions()
        {
            int userId = _userAuthorizationInfoService.UserId;
            var sessions = await _ctx.Session.Include(x => x.SessionDrink).ThenInclude(x => x.Drink).Where(x => x.UserId == userId).OrderByDescending(x => x.CreatedOn).Take(10).ToListAsync();

            var result = sessions.Select(x => CalculateSession(x)).OrderBy(x => x.Open).OrderByDescending(x => x.CreatedOn).ToList();

            if (result.Count() > 0 && !result[0].Open && result[0].CreatedOn > DateTime.Now.AddHours(-1))
            {
                result[0].Open = true;
            }

            return result;
        }

        public async Task AddSessionDrink(SessionDrinkDto sessionDrinkDto)
        {
            if (!await _userAuthorizationInfoService.HasAccessToSession(sessionDrinkDto)) throw new UnauthorizedAccessException();

            var sessionDrink = _mapper.Map<SessionDrink>(sessionDrinkDto);
            sessionDrink.CreatedBy = _userAuthorizationInfoService.Identity;
            sessionDrink.CreatedOn = DateTime.Now;

            _ctx.SessionDrink.Add(sessionDrink);
            await _ctx.SaveChangesAsync();
        }
        public async Task UpdateSessionDrink(SessionDrinkDto sessionDrinkDto)
        {
            if (!await _userAuthorizationInfoService.HasAccessToSession(sessionDrinkDto)) throw new UnauthorizedAccessException();

            var sessionDrink = _mapper.Map<SessionDrink>(sessionDrinkDto);
            _ctx.SessionDrink.Update(sessionDrink);
            await _ctx.SaveChangesAsync();
        }
        public async Task DeleteSessionDrink(SessionDrinkDto sessionDrinkDto)
        {
            if (!await _userAuthorizationInfoService.HasAccessToSession(sessionDrinkDto)) throw new UnauthorizedAccessException();

            var sessionDrink = _mapper.Map<SessionDrink>(sessionDrinkDto);
            _ctx.SessionDrink.Remove(sessionDrink);
            await _ctx.SaveChangesAsync();
        }
        private SessionDto CalculateSession(Session session)
        {
            var sessionDto = _mapper.Map<SessionDto>(session);
            sessionDto.SessionDrinks = (_mapper.Map<IEnumerable<SessionDrinkDto>>(session.SessionDrink)).OrderByDescending(x => x.CreatedOn);

            var sexFactor = session.Sex ? 0.72 : 0.61;
            var degradationRate = 0.002 * session.Weight * session.Weight * sexFactor / 60; //g/m

            var drinks = sessionDto.SessionDrinks.OrderBy(x => x.CreatedOn);
            var alcholRemaining = 0.0;
            var dateTimenow = DateTime.Now;
            foreach (var drink in drinks)
            {
                if (alcholRemaining <= 0)
                {
                    var minutesSinceDrink = (dateTimenow - drink.CreatedOn).TotalMinutes;
                    var minutesNeededToClearDrink = drink.GramAlcohol / degradationRate;
                    if (minutesNeededToClearDrink > minutesSinceDrink)
                    {
                        drink.MinutesRemaining = (int)(Math.Floor(minutesNeededToClearDrink - minutesSinceDrink));
                        alcholRemaining = (drink.MinutesRemaining) * degradationRate;
                        drink.AlcholRemaining = alcholRemaining;
                    }
                    //else drink is cleared
                }
                else
                {
                    drink.AlcholRemaining = drink.GramAlcohol;
                    alcholRemaining += drink.AlcholRemaining;
                    drink.MinutesRemaining = (int)Math.Floor(alcholRemaining / degradationRate);
                }
            }
            sessionDto.Promile = alcholRemaining / (session.Weight * sexFactor);
            if (sessionDto.Promile > 0)
            {
                sessionDto.Open = true;
            }
            return sessionDto;

        }


    }
}
