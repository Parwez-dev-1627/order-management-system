using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using WebAPI.Data;
using WebAPI.Entities;

namespace WebAPI.Repositories
{
    public class AddressRepository : IAddressRepository
    {
        private readonly IApplicationDbContext _context;
        public AddressRepository(IApplicationDbContext context)
        {
            _context = context;
        }
        public async Task<IEnumerable<Address>> GetAllAsync()
        {
            return await _context.Addresses.ToListAsync();
        }
        public async Task<Address> GetByIdAsync(int id)
        {
            return await _context.Addresses.FindAsync(id);
        }
        public async Task AddAsync(Address address)
        {
            await _context.Addresses.AddAsync(address);
            _context.SaveChanges();
        }
    }
}
