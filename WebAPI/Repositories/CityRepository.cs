using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using WebAPI.Data;
using WebAPI.Entities;

namespace WebAPI.Repositories
{
    public class CityRepository : ICityRepository
    {
        private readonly IApplicationDbContext _context;
        public CityRepository(IApplicationDbContext context)
        {
            _context = context;
        }
        public async Task<IEnumerable<City>> GetAllAsync()
        {
            return await _context.Cities.ToListAsync();
        }
        public async Task<City> GetByIdAsync(int id)
        {
            return await _context.Cities.FindAsync(id);
        }
        public async Task AddAsync(City city)
        {
            await _context.Cities.AddAsync(city);
            _context.SaveChanges();
        }
    }
}
