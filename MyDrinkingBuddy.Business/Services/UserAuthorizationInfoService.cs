using Microsoft.AspNetCore.Http;
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
    public interface IUserAuthorizationInfoService
    {
        int UserId { get; }
        string Identity { get; }
        Task<bool> HasAccessToSession(SessionDrinkDto s);
    }

    public class UserAuthorizationInfoService : IUserAuthorizationInfoService
    {
        private readonly IHttpContextAccessor _httpContextAccessor;
        private readonly MDBContext _ctx;

        public UserAuthorizationInfoService(IHttpContextAccessor httpContextAccessor, MDBContext ctx)
        {
            _httpContextAccessor = httpContextAccessor;
            _ctx = ctx;
        }


        public int UserId
        {
            get
            {
                return Convert.ToInt32(_httpContextAccessor.HttpContext.User.Claims.FirstOrDefault(x => x.Type == MDBClaimsTypes.UserId)?.Value ?? "0");
            }
        }

        public string Identity
        {
            get
            {
                return _httpContextAccessor.HttpContext.User.Claims.FirstOrDefault(x => x.Type == MDBClaimsTypes.Email)?.Value ?? "Anonymous";
            }
        }

        public async Task<bool> HasAccessToSession(SessionDrinkDto s)
        {
            var session = await _ctx.Session.FirstOrDefaultAsync(x => x.SessionId == s.SessionId);
            if (session == null) return false;
            if (session.UserId != UserId) return false;
            return true;
        }
    }
}
