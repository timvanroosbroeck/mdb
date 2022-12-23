using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MyDrinkingBuddy.Common.Dtos
{
    public class DrinkDto
    {
        public int DrinkId { get; set; }
        public int? UserId { get; set; }
        public int DrinkCategoryId { get; set; }
        public string Name { get; set; }
        public double AlcoholPercentage { get; set; }
        public int DefaultSize { get; set; }
        public string ImageUrl { get; set; }
        public DateTime CreatedOn { get; set; }
        public string CreatedBy { get; set; }
        public DateTime? ModifiedOn { get; set; }
        public string ModifiedBy { get; set; }
    }
}
