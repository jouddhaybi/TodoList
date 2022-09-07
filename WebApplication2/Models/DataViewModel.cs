using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Data.Entity;
using System.Linq;
using System.Web;

namespace WebApplication2.Models
{
    public class DataViewModel : DbContext
    {
        public DataViewModel()
        : base("DefaultConnection")
        {
            Database.SetInitializer<DataViewModel>(null);
        }

        // DbSet's here
        public DbSet<Importance> Importances { get; set; }
        public DbSet<ToDo> Todo { get; set; }
    }
    [Table("Importance")]
    public class Importance
    {
        public int ImportanceId { get; set; }
        public string ImportanceName { get; set; }
    }
    [Table("ToDo")]
    public class ToDo
    {
        public int TodoID { get; set; }
        public string Title { get; set; }
        public string Category { get; set; }
        public string DueDate { get; set; }
        public string Estimate { get; set; }
        public string ImportanceName { get; set; }
       
    }

}