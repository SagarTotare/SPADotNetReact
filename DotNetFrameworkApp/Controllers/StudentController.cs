using DotNetFrameworkApp.Data;
using DotNetFrameworkApp.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Security.Claims;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using System.IdentityModel.Tokens.Jwt;

namespace DotNetFrameworkApp.Controllers
{
    public class StudentController : ApiController
    {
        [HttpGet]
        public IHttpActionResult GetToken()
        {
            string key = "R91WaXU87SkPyFcvtyatLYe5LlVg1WH5"; 
            var issuer = "http://localhost:54306/";

            var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(key));
            var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);

            //Create a List of Claims, Keep claims name short    
            var ClaimsList = new List<Claim>();
            ClaimsList.Add(new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()));
            ClaimsList.Add(new Claim("valid", "1"));
            ClaimsList.Add(new Claim("userid", "1"));
            ClaimsList.Add(new Claim("name", "Banu"));

            //Create Security Token object by giving required parameters    
            var token = new JwtSecurityToken(issuer, //Issure    
                            issuer,  //Audience    
                            ClaimsList,
                            expires: DateTime.Now.AddDays(1),
                            signingCredentials: credentials);
            var jwt_token = new JwtSecurityTokenHandler().WriteToken(token);
            return Ok(jwt_token);
        }

        [HttpGet]
        public IHttpActionResult GetIdCon()
        {
            return Ok();
        }

        [Authorize]
        [HttpGet]
        public IHttpActionResult GetStudent()
        {
            IList<Student> students = null;

            using (var ctx = new ApiDBContext())
            {
                students = ctx.Students.ToList<Student>();
            }

            if (students.Count == 0)
            {
                return NotFound();
            }

            return Ok(students);
        }

        [HttpPost]
        public IHttpActionResult AddStudent(Student student)
        {
            if (!ModelState.IsValid)
                return BadRequest("Invalid data.");

            using (var ctx = new ApiDBContext())
            {
                var grade = ctx.Grades.Find(1);

                ctx.Students.Add(new Student()
                {
                    StudentName = student.StudentName,
                    DateOfBirth = student.DateOfBirth,
                    Photo = student.Photo,
                    Height = student.Height,
                    Weight = student.Weight,
                    Grade = grade
                });

                ctx.SaveChanges();
            }

            return Ok("Student added.");
        }

        [HttpPost]
        public IHttpActionResult AddGrade(Grade grade)
        {
            using (var ctx = new ApiDBContext())
            {
                ctx.Grades.Add( new Grade() {
                    GradeName = "A",
                    Section = "First class distinction"
                });

                ctx.SaveChanges();
            }
            return Ok();
        }

        [HttpPut]
        public IHttpActionResult UpdateStudent(int id, Student student)
        {
            using (var ctx = new ApiDBContext())
            {
                Student rsStudent = ctx.Students.Find(id);
                rsStudent.StudentName = student.StudentName;
                
                ctx.SaveChanges();
            }
            return Ok("Data Updaed");
        }

        [HttpDelete]
        public IHttpActionResult RemoveStudent(int id)
        {
            using (var ctx = new ApiDBContext())
            {
                Student rsStudent = ctx.Students.Find(id);
                if (rsStudent == null)
                {
                    return NotFound();
                }
                ctx.Entry(rsStudent).State = System.Data.Entity.EntityState.Deleted;

                ctx.SaveChanges();
            }
            return Ok("Data Updaed");
        }
    }
}
