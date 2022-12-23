using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MyDrinkingBuddy.Common.Dtos
{
    public class SessionDrinkDto
    {
        public int SessionDrinkId { get; set; }
        public int SessionId { get; set; }
        public int DrinkId { get; set; }
        public string DrinkName { get; set; }
        public string? Comment { get; set; }
        public double AlcoholPercentage { get; set; }
        public int Size { get; set; }

        public double GramAlcohol => AlcoholPercentage * Size / 100;
        public double AlcholRemaining { get; set; }
        public int MinutesRemaining { get; set; }
        public string? TimeRemaining => TimeSpan.FromMinutes(MinutesRemaining).ToString(@"hh\:mm");
        public DateTime CreatedOn { get; set; }
        public string? CreatedBy { get; set; }
        public DateTime? ModifiedOn { get; set; }
        public string? ModifiedBy { get; set; }
    }
}
