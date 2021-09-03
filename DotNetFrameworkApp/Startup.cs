using Microsoft.Owin;
using Owin;
using System;
using System.Threading.Tasks;
using Microsoft.Owin.Security.Jwt;
using Microsoft.Owin.Security;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using System.Configuration;

[assembly: OwinStartup(typeof(DotNetFrameworkApp.Startup))]

namespace DotNetFrameworkApp
{
    public class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            string key = ConfigurationManager.AppSettings["JWTSecretKey"];
            app.UseJwtBearerAuthentication(
                new JwtBearerAuthenticationOptions
                {
                    AuthenticationMode = AuthenticationMode.Active,
                    TokenValidationParameters = new TokenValidationParameters()
                    {
                        ValidateIssuer = true,
                        ValidateAudience = true,
                        ValidateIssuerSigningKey = true,
                        ValidIssuer = ConfigurationManager.AppSettings["JWTIssuer"],  
                        ValidAudience = ConfigurationManager.AppSettings["JWTIssuer"],
                        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(key))
                    }
                });
        }
    }
}
