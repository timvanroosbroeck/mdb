using Microsoft.AspNetCore.Mvc;
using MyDrinkingBuddy.Business.Services;
using MyDrinkingBuddy.Common.Dtos;

namespace MyDrinkingBuddy.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SessionController : ControllerBase
    {
        private readonly ISessionService _sessionService;

        public SessionController(ISessionService sessionService)
        {
            _sessionService = sessionService;
        }
        [HttpGet("[action]")]
        public async Task<ActionResult<IEnumerable<SessionDto>>> GetAll()
        {
            var result = await _sessionService.GetSessions();
            return Ok(result);
        }

        [HttpGet("[action]")]
        public async Task<ActionResult<SessionDto>> Get(int sessionId)
        {
            var result = await _sessionService.GetSession(sessionId);
            return Ok(result);
        }
        [HttpPost("[action]")]
        public async Task<ActionResult<int>> NewSession()
        {
            var sessionId = await _sessionService.NewSession();
            return Ok(sessionId);
        }
        [HttpPost("[action]")]
        public async Task<ActionResult> SaveDrink(SessionDrinkDto sessionDrinkDto)
        {
            await _sessionService.AddSessionDrink(sessionDrinkDto);
            return Ok();
        }
        [HttpPut("[action]")]
        public async Task<ActionResult> UpdateDrink(SessionDrinkDto sessionDrinkDto)
        {
            await _sessionService.UpdateSessionDrink(sessionDrinkDto);
            return Ok();
        }
        [HttpDelete("[action]")]
        public async Task<ActionResult> DeleteDrink(SessionDrinkDto sessionDrinkDto)
        {
            await _sessionService.DeleteSessionDrink(sessionDrinkDto);
            return Ok();
        }
    }
}
