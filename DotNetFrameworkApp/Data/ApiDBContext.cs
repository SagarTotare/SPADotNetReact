using DotNetFrameworkApp.Models;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;

namespace DotNetFrameworkApp.Data
{
    public class ApiDBContext : DbContext
    {
        public ApiDBContext(): base("DotNetFrameworkAppConnectionString")
        {
            Database.SetInitializer<ApiDBContext>(new CreateDatabaseIfNotExists<ApiDBContext>());
        }

        public DbSet<User> Users { get; set; }
        public DbSet<Student> Students { get; set; }
        public DbSet<Grade> Grades { get; set; }
    }
}