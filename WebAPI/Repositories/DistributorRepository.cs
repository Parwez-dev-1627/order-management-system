using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using WebAPI.Data;
using WebAPI.Entities;

namespace WebAPI.Repositories
{
    public class DistributorRepository : IDistributorRepository
    {
        private readonly IApplicationDbContext _context;
        public DistributorRepository(IApplicationDbContext context)
        {
            _context = context;
        }
        public async Task<IEnumerable<Distributor>> GetAllAsync()
        {
            return await _context.Distributors.ToListAsync();
        }
        public async Task<Distributor> GetByIdAsync(int id)
        {
            return await _context.Distributors.FindAsync(id);
        }
        public async Task AddAsync(Distributor distributor)
        {
            await _context.Distributors.AddAsync(distributor);
            _context.SaveChanges();
        }
    }
}
