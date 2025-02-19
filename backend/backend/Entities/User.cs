using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace backend.Entities
{
    public class User
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }

        [Required]
        public string Firstname { get; set; }

        [Required] public string Lastname { get; set; }

        public string? Email { get; set; }

        [Required] public string Phone { get; set; }


    }
}
