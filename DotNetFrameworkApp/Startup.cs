using Microsoft.Owin;
using Owin;
using System;
using System.Threading.Tasks;
using Microsoft.Owin.Security.Jwt;
using Microsoft.Owin.Security;
using Microsoft.IdentityModel.Tokens;
using System.Text;

[assembly: OwinStartup(typeof(DotNetFrameworkApp.Startup))]

namespace DotNetFrameworkApp
{
    public class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            app.UseJwtBearerAuthentication(
                new JwtBearerAuthenticationOptions
                {
                    AuthenticationMode = AuthenticationMode.Active,
                    TokenValidationParameters = new TokenValidationParameters()
                    {
                        ValidateIssuer = true,
                        ValidateAudience = true,
                        ValidateIssuerSigningKey = true,
                        ValidIssuer = "http://localhost:54306/",  
                        ValidAudience = "http://localhost:54306/",
                        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("R91WaXU87SkPyFcvtyatLYe5LlVg1WH5"))
                    }
                });
        }
    }
}
