﻿// <auto-generated> This file has been auto generated by EF Core Power Tools. </auto-generated>
#nullable disable
using System;
using System.Collections.Generic;

namespace MyDrinkingBuddy.Data.Models
{
    public partial class SessionDrink
    {
        public int SessionDrinkId { get; set; }
        public int SessionId { get; set; }
        public int DrinkId { get; set; }
        public string Comment { get; set; }
        public double AlcoholPercentage { get; set; }
        public int Size { get; set; }
        public DateTime CreatedOn { get; set; }
        public string CreatedBy { get; set; }
        public DateTime? ModifiedOn { get; set; }
        public string ModifiedBy { get; set; }

        public virtual Drink Drink { get; set; }
        public virtual Session Session { get; set; }
    }
}