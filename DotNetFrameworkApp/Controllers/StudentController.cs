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
    public class StudentController : ApiController
    {
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
