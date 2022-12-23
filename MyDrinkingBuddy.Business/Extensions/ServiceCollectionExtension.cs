using AutoMapper;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.EntityFrameworkCore;
using MyDrinkingBuddy.Business.Mapper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using MyDrinkingBuddy.Data.Models;
using MyDrinkingBuddy.Business.Services;

namespace MyDrinkingBuddy.Business.Extensions
{
    public static class ServiceCollectionExtension
    {
        public static IServiceCollection UseServices(this IServiceCollection services, string connectionString)
        {

            //services.AddAutoMapper();
            services.AddTransient<IMapper>(sp => new AutoMapper.Mapper(new MapperConfiguration(cfg =>
            {
                cfg.AddProfile(new MapperProfile());
            }), sp.GetService));

            services.AddDbContext<MDBContext>(options => options.UseSqlServer(connectionString));

            services.AddTransient<IDrinkService, DrinkService>();
            services.AddTransient<ISessionService, SessionService>();
            return services;

        }
    }
}
