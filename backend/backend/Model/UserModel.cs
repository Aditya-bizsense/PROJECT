using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace backend.Model
{
    public class UserModel
    {

        [Required(ErrorMessage = "First name is required")]
        public required string Firstname { get; set; }

        [Required(ErrorMessage = "Last name is required")]
        public required string Lastname { get; set; }

        [Required]
        public required string PasswordHash { get; set; }
        
        [Required(ErrorMessage = "Email is required")]
        [EmailAddress(ErrorMessage = "Invalid email format")]
        public required string Email { get; set; }

        [Required(ErrorMessage = "Phone number is required")]
        [Phone(ErrorMessage = "Invalid phone number")]
        public required string Phone { get; set; }
    }
}
