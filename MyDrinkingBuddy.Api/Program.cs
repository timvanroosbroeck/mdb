using Microsoft.Extensions.Configuration;
using MyDrinkingBuddy.Business.Extensions;

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

app.UseAuthorization();

app.MapControllers();
app.UseCors();
app.Run();
