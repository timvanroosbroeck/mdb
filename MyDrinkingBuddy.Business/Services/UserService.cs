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
    public interface IUserService
    {
        Task<UserDto> GetUser();
        Task UpdateUser(UserDto userDto);
    }

    public class UserService : IUserService
    {
        private readonly IMapper _mapper;
        private readonly MDBContext _ctx;
        private readonly IUserAuthorizationInfoService _userAuthorizationInfoService;

        public UserService(IMapper mapper, MDBContext ctx, IUserAuthorizationInfoService userAuthorizationInfoService)
        {
            _mapper = mapper;
            _ctx = ctx;
            _userAuthorizationInfoService = userAuthorizationInfoService;
        }
        public async Task UpdateUser(UserDto userDto)
        {
            if (_userAuthorizationInfoService.UserId != userDto?.UserId) throw new UnauthorizedAccessException();

            var dbUser = await _ctx.User.FirstOrDefaultAsync(x => x.UserId == userDto.UserId);
            dbUser.ModifiedOn = DateTime.Now;
            dbUser.ModifiedBy = _userAuthorizationInfoService.Identity;
            dbUser.Weight = userDto.Weight;
            dbUser.Sex = userDto.Sex;

            await _ctx.SaveChangesAsync();
        }

        public async Task<UserDto> GetUser()
        {
            var dbUser = await _ctx.User.FirstOrDefaultAsync(x => x.UserId == _userAuthorizationInfoService.UserId);
            return _mapper.Map<UserDto>(dbUser);
        }
    }
}
