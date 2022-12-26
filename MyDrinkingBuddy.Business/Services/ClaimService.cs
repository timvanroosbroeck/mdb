using AutoMapper;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Caching.Memory;
using MyDrinkingBuddy.Data.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Mail;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace MyDrinkingBuddy.Business.Services
{
    public interface IClaimService
    {
        Task<IEnumerable<Claim>> GetClaimsForUser(ClaimsPrincipal p);
    }

    public class ClaimService : IClaimService
    {
        private readonly IMemoryCache _memoryCache;
        private readonly IMapper _mapper;
        private readonly MDBContext _ctx;

        public ClaimService(IMapper mapper, MDBContext ctx, IMemoryCache memoryCache)
        {
            _mapper = mapper;
            _ctx = ctx;
            _memoryCache = memoryCache;
        }
        public async Task<IEnumerable<Claim>> GetClaimsForUser(ClaimsPrincipal p)
        {
            var identifier = p.Claims.FirstOrDefault(x => x.Type == "emails")?.Value;

            if (_memoryCache.TryGetValue(identifier, out IEnumerable<Claim> cachedClaims))
                return cachedClaims;

            var user = await _ctx.User.Where(x => x.Email == identifier).FirstOrDefaultAsync();
            if (user == null && !string.IsNullOrEmpty(identifier))
            {
                if (IsValid(identifier))
                {
                    user = new User()
                    {
                        CreatedBy = identifier,
                        CreatedOn = DateTime.Now,
                        Email = identifier,
                        FirstName = p.Claims.FirstOrDefault(x => x.Type == ClaimTypes.GivenName)?.Value,
                        LastName = p.Claims.FirstOrDefault(x => x.Type == ClaimTypes.Surname)?.Value,
                        IsDeleted = false,
                        Weight = 85,
                        Sex = true,
                        CultureCode = "nl-BE",
                    };
                    _ctx.User.Add(user);
                    await _ctx.SaveChangesAsync();
                }
            }
            if (user == null)
            {
                return Enumerable.Empty<Claim>();
            }

            var claims = new List<Claim>();
            claims.Add(new Claim(MDBClaimsTypes.UserId, user.UserId.ToString()));
            claims.Add(new Claim(MDBClaimsTypes.Email, user.Email.ToString()));

            _memoryCache.Set(identifier, claims, DateTimeOffset.Now.AddMinutes(30));

            return claims;
        }
        private bool IsValid(string emailaddress)
        {
            try
            {
                MailAddress m = new MailAddress(emailaddress);

                return true;
            }
            catch (FormatException)
            {
                return false;
            }
        }

    }
    public static class MDBClaimsTypes
    {
        public const string UserId = "userId";
        public const string Admin = "Admin";
        public const string Email = "Admin";

    }
}
