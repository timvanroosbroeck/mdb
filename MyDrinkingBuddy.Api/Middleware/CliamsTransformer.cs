using Microsoft.AspNetCore.Authentication;
using MyDrinkingBuddy.Business.Services;
using System.Security.Claims;

namespace MyDrinkingBuddy.Api.Middleware
{
    public class SecurityClaimsTransformation : IClaimsTransformation
    {
        private readonly IHttpContextAccessor _context;
        private readonly IClaimService _claimService;

        public SecurityClaimsTransformation(
            IHttpContextAccessor httpContext, IClaimService claimService)
        {
            _context = httpContext;
            _claimService = claimService;
        }

        public async Task<ClaimsPrincipal> TransformAsync(ClaimsPrincipal p)
        {
            //"http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress"
            var userClaims = await _claimService.GetClaimsForUser(p);

            ((ClaimsIdentity)p.Identity).AddClaims(userClaims);

            return p;
        }

    }
}
