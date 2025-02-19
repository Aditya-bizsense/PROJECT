using backend.Entities;

namespace backend
{
    public class Users
    {
        public List<User> User { get; set; }
        public Users()
        {
            User = new List<User>()
            {
                new User() { Id = 1, Firstname = "John", Lastname = "Doe", 
                    PasswordHash = "password" ,
                    Email = "John@gmail.com",
                    Phone = "1234567890" },
                new User() { Id = 2, Firstname = "Jane", Lastname = "Doe",
                    PasswordHash = "password",
                    Email = "Jane@gmail.com", Phone = "0987654321" }
            };
        }
    }
}
