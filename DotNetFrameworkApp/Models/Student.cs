using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace DotNetFrameworkApp.Models
{
    public class Student
    {
        public int StudentID { get; set; }
        public string StudentName { get; set; }
        public DateTime? DateOfBirth { get; set; }
        public string Photo { get; set; }
        public int Height { get; set; }
        public int  Weight { get; set; }

        public Grade Grade { get; set; }
    }
}