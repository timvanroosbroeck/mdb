using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc.ApplicationModels;
using Microsoft.AspNetCore.Mvc.Authorization;
using Microsoft.Extensions.Configuration;
using Microsoft.Identity.Web;
using MyDrinkingBuddy.Business.Extensions;
using System.Text.Json.Serialization;

var builder = WebApplication.CreateBuilder(args);


var origins = builder.Configuration.GetSection("Cors:Origins").Get<string[]>();
builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(config =>
    {

        config.AllowAnyHeader();
        config.AllowAnyMethod();
        config.AllowCredentials();
        config.WithOrigins(origins)
        .WithExposedHeaders("Content-Disposition");
    });
});

// Adds Microsoft Identity platform (Azure AD B2C) support to protect this Api
builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
        .AddMicrosoftIdentityWebApi(options =>
{
    builder.Configuration.Bind("AzureAdB2C", options);

    options.TokenValidationParameters.NameClaimType = "name";
},
options => { builder.Configuration.Bind("AzureAdB2C", options); });

builder.Services.AddMvc(opts =>
{
    var policy = new AuthorizationPolicyBuilder()
         .RequireAuthenticatedUser()
         .Build();
    opts.Filters.Add(new AuthorizeFilter(policy));
    //opts.CacheProfiles.Add("StandardList", new Microsoft.AspNetCore.Mvc.CacheProfile
    //{
    //    Duration = 28800, //8u
    //    VaryByHeader = "Content-Language,Clear-cache"
    //});
});

// Add services to the container.
builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.UseServices(builder.Configuration.GetConnectionString("MDB"));

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();
app.UseCors();
app.Run();
