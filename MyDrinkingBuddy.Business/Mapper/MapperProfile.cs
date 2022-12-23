using AutoMapper;
using MyDrinkingBuddy.Common.Dtos;
using MyDrinkingBuddy.Data.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MyDrinkingBuddy.Business.Mapper
{
    public class MapperProfile : Profile
    {
        public MapperProfile()
        {
            CreateMap<Drink, DrinkDto>().ReverseMap();
            CreateMap<Session, SessionDto>().ReverseMap();
            CreateMap<SessionDrink, SessionDrinkDto>().ForMember(dest => dest.DrinkName, opt => opt.MapFrom(src => src.Drink.Name));
            CreateMap<SessionDrinkDto, SessionDrink>();
        }
    }
}
