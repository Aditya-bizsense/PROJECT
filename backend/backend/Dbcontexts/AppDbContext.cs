using backend.Entities;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace backend.Dbcontexts
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options)
        : base(options) { }

        public DbSet<User> Users { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<User>().HasData(
                new User
                {
                    Id = 1,
                    Firstname = "John Doe",
                    Lastname = "Doe",
                    PasswordHash = "password123",
                    Email = "John@gmail.com",
                    Phone = "1234567890"
                }
                ,
                new User
                {
                    Id = 2,
                    Firstname = "Jane",
                    Lastname = "Smith",
                    PasswordHash = "password123",
                    Email = "Jane@gmail.com",
                    Phone = "0987654321"
                }
                );

            base.OnModelCreating(modelBuilder);
        }
                    //protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
                    //{
                    //    optionsBuilder.UseSqlite("connectionstring");

                    //    base.OnConfiguring(optionsBuilder);
                    //}
    }
}