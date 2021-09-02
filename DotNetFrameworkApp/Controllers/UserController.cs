using DotNetFrameworkApp.Data;
using DotNetFrameworkApp.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace DotNetFrameworkApp.Controllers
{
    public class UserController : ApiController
    {
        [HttpPost]
        public IHttpActionResult Login(string Username, string Password)
        {
            if (!ModelState.IsValid)
                return BadRequest("Invalid data.");

            using (var ctx = new ApiDBContext())
            {
                var user = ctx.Users.Where(s => s.UserName == Username && s.password == Password).FirstOrDefault();

                if(user == null)
                {
                    return Ok("Login Failed: UserName or Password is not Correct");
                }
            }

            return Ok("Login Successfull");
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
                    password = user.password
                });
               
                ctx.SaveChanges();
            }

            return Ok("User registered.");
        }
    }
}
