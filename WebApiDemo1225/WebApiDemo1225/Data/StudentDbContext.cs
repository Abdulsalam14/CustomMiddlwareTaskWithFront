using Microsoft.EntityFrameworkCore;
using WebApiDemo1225.Entities;

namespace WebApiDemo1225.Data
{
    public class StudentDbContext:DbContext
    {
        public StudentDbContext(DbContextOptions<StudentDbContext> options)
            :base(options)
        {
        }
        public DbSet<Student> Students { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {

            base.OnConfiguring(optionsBuilder);
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Student>().HasData(
            new Student { Id = 1, Fullname = "John Doe", Age = 20, SeriaNo = "12345", Score = 85, Username = "john123", Password="john123" },
            new Student { Id = 2, Fullname = "Student2", Age = 22, SeriaNo = "54321", Score = 75, Username = "student321", Password= "student321" }
            );
        }
    }
}
