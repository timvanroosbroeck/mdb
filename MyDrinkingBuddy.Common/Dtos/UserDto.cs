using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MyDrinkingBuddy.Common.Dtos
{
    public class UserDto
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string CultureCode { get; set; }
        public double Weight { get; set; }
        public bool Sex { get; set; }
        public int UserId { get; set; }
    }
}
