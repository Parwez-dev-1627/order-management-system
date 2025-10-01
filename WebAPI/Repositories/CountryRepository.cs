using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using WebAPI.Data;
using WebAPI.Entities;

namespace WebAPI.Repositories
{
    public class CountryRepository : ICountryRepository
    {
        private readonly IApplicationDbContext _context;
        public CountryRepository(IApplicationDbContext context)
        {
            _context = context;
        }
        public async Task<IEnumerable<Country>> GetAllAsync()
        {
            return await _context.Countries.ToListAsync();
        }
        public async Task<Country> GetByIdAsync(int id)
        {
            return await _context.Countries.FindAsync(id);
        }
        public async Task AddAsync(Country country)
        {
            await _context.Countries.AddAsync(country);
            _context.SaveChanges();
        }
    }
}
