// <auto-generated> This file has been auto generated by EF Core Power Tools. </auto-generated>
#nullable disable
using System;
using System.Collections.Generic;

namespace MyDrinkingBuddy.Data.Models
{
    public partial class Session
    {
        public Session()
        {
            SessionDrink = new HashSet<SessionDrink>();
        }

        public int SessionId { get; set; }
        public int UserId { get; set; }
        public double Weight { get; set; }
        public bool Sex { get; set; }
        public bool IsDeleted { get; set; }
        public DateTime CreatedOn { get; set; }
        public string CreatedBy { get; set; }
        public DateTime? ModifiedOn { get; set; }
        public string ModifiedBy { get; set; }

        public virtual User User { get; set; }
        public virtual ICollection<SessionDrink> SessionDrink { get; set; }
    }
}