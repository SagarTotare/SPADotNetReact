using DotNetFrameworkApp.Data;
using DotNetFrameworkApp.Models;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using System.Web.Http;
using System.Configuration;

namespace DotNetFrameworkApp.Controllers
{
    public class UserController : ApiController
    {

        [HttpGet]
        public Object GetToken(User user)
        {
            string key = ConfigurationManager.AppSettings["JWTSecretKey"]; 
            var issuer = ConfigurationManager.AppSettings["JWTIssuer"];

            var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(key));
            var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);

            //Create a List of Claims, Keep claims name short    
            var ClaimsList = new List<Claim>();
            ClaimsList.Add(new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()));
            ClaimsList.Add(new Claim("userid", user.Id.ToString()));
            ClaimsList.Add(new Claim("name", user.Name));

            //Create Security Token object by giving required parameters    
            var token = new JwtSecurityToken(issuer, //Issure    
                            issuer,  //Audience    
                            ClaimsList,
                            expires: DateTime.Now.AddDays(1),
                            signingCredentials: credentials);
            var jwt_token = new JwtSecurityTokenHandler().WriteToken(token);
            return new { data = jwt_token };
        }

        [HttpGet]
        public IHttpActionResult GetUser()
        {
            return Ok("user data");
        }

        [HttpPost]
        public IHttpActionResult Login(User user)
        {
            if (!ModelState.IsValid)
                return BadRequest("Invalid data.");

            using (var ctx = new ApiDBContext())
            {
                var rsUser = ctx.Users.Where(s => s.UserName == user.UserName && s.Password == user.Password).FirstOrDefault();

                if(rsUser == null)
                {
                    return Ok("Login Failed: UserName or Password is not Correct");
                }
                var token = this.GetToken(rsUser);

                return Ok(token);
            }

            

            
                
        }

        [HttpPost]
        public IHttpActionResult RegisterUser([FromBody] User user)
        {
            if (!ModelState.IsValid)
                return BadRequest("Invalid data.");

            using (var ctx = new ApiDBContext())
            {
                ctx.Users.Add(new User()
                {
                    EmailId = user.EmailId,
                    UserName = user.UserName,
                    PhoneNo = user.PhoneNo,
                    Password = user.Password
                });
               
                ctx.SaveChanges();
            }

            return Ok("User registered.");
        }
    }
}
