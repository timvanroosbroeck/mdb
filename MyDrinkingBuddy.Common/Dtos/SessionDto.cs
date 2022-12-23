using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MyDrinkingBuddy.Common.Dtos
{
    public class SessionDto
    {

        public int SessionId { get; set; }
        public int UserId { get; set; }
        public bool IsDeleted { get; set; }
        public double Promile { get; set; }
        public double Weight { get; set; }
        public bool Sex { get; set; }
        public bool Open { get; set; } = false;
        public DateTime CreatedOn { get; set; }
        public string CreatedBy { get; set; }
        public DateTime? ModifiedOn { get; set; }
        public string ModifiedBy { get; set; }
        public IEnumerable<SessionDrinkDto> SessionDrinks { get; set; }

    }
}
