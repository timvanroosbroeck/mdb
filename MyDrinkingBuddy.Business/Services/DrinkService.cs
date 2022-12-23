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
    public interface IDrinkService
    {
        Task<IEnumerable<DrinkDto>> GetAllDrinks();
    }

    public class DrinkService : IDrinkService
    {
        private readonly IMapper _mapper;
        private readonly MDBContext _ctx;

        public DrinkService(IMapper mapper, MDBContext ctx)
        {
            _mapper = mapper;
            _ctx = ctx;
        }
        public async Task<IEnumerable<DrinkDto>> GetAllDrinks()
        {
            var drinks = await _ctx.Drink.ToListAsync();
            return _mapper.Map<IEnumerable<DrinkDto>>(drinks);
        }
    }
}
