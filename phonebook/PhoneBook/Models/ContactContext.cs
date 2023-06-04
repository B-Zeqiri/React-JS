using Microsoft.EntityFrameworkCore;

namespace PhoneBook.Models
{
    public class ContactContext : DbContext
    {
        public ContactContext(DbContextOptions<ContactContext> options) : base(options)
        {

        }
        public DbSet<Contacts> Contacts { get; set; }
    }
}
