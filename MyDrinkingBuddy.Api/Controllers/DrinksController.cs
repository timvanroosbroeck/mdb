using Microsoft.AspNetCore.Mvc;
using MyDrinkingBuddy.Business.Services;
using MyDrinkingBuddy.Common.Dtos;

namespace MyDrinkingBuddy.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DrinksController : ControllerBase
    {
        private readonly IDrinkService _drinkService;

        public DrinksController(IDrinkService drinkService)
        {
           _drinkService = drinkService;
        }

        [HttpGet("[action]")]
        public async Task<ActionResult<IEnumerable<DrinkDto>>> GetAll()
        {
            var result = await _drinkService.GetAllDrinks();
            return Ok(result);
        }
    

    }
}
