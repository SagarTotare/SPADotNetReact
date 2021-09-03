using DotNetFrameworkApp.Data;
using DotNetFrameworkApp.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Cors;

namespace DotNetFrameworkApp.Controllers
{
    [EnableCors(origins: "*", headers: "*", methods: "*")]
    public class UserController : ApiController
    {
        [HttpGet]
        public IHttpActionResult GetUser()
        {
            return Ok("user data");
        }

        [HttpPost]
        //public IHttpActionResult Login(string Username, string Password)
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
                    Name = user.Name,
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
