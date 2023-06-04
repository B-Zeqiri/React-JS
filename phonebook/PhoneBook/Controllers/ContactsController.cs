using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PhoneBook.Models;

namespace PhoneBook.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ContactsController : ControllerBase
    {
        private readonly ContactContext _contactContext;
        public ContactsController(ContactContext contactContext)
        {
            _contactContext= contactContext;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Contacts>>> GetContacts()
        {
            if(_contactContext.Contacts == null)
            {
                return NotFound();
            }
            return await _contactContext.Contacts.ToListAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Contacts>> GetContact(int id)
        {
            if (_contactContext.Contacts == null)
            {
                return NotFound();
            }
            var contact = await _contactContext.Contacts.FindAsync(id);
            if(contact == null)
            {
                return NotFound();
            }
            return contact;
        }

        [HttpPost]
        public async Task<ActionResult<Contacts>> PostContanct(Contacts contact)
        {
            _contactContext.Contacts.Add(contact);
            await _contactContext.SaveChangesAsync();

            return CreatedAtAction(nameof(GetContact), new {id = contact.id}, contact);
        }
        [HttpPut("{id}")]
        public async Task<ActionResult> PutContact(int id, Contacts contact)
        {
            if(id != contact.id)
            {
                return BadRequest();
            }
            _contactContext.Entry(contact).State = EntityState.Modified;
            try
            {
                await _contactContext.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                throw;
            }
            return Ok();
        }
        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteContact(int id)
        {
            if(_contactContext.Contacts == null)
            {
                return NotFound();
            }
            var contact = await _contactContext.Contacts.FindAsync(id); 
            if(contact == null) 
            { 
                return NotFound();
            }
            _contactContext.Contacts.Remove(contact);
            await _contactContext.SaveChangesAsync();

            return Ok();
        }
    }
}
