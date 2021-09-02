using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace DotNetFrameworkApp.Models
{
    public class User
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string UserName { get; set; }
        public string password { get; set; }
        public string EmailId { get; set; }
        public string PhoneNo { get; set; }
    }
}