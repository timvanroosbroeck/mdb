using Microsoft.AspNetCore.Mvc;
using MyDrinkingBuddy.Business.Services;
using MyDrinkingBuddy.Common.Dtos;

namespace MyDrinkingBuddy.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController: ControllerBase
    {
        private readonly IUserService _userService;

        public UserController(IUserService userService)
        {
           _userService = userService;
        }
        [HttpGet("[action]")]
        public async Task<ActionResult<UserDto>> Get()
        {
            var result = await _userService.GetUser();
            return Ok(result);
        }
        [HttpPut("[action]")]
        public async Task<ActionResult> Update(UserDto userDto)
        {
            await _userService.UpdateUser(userDto);
            return Ok();
        }
    }
}
