using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using WebAPI.Data;
using WebAPI.Entities;

namespace WebAPI.Repositories
{
    public class ProductionRepository : IProductionRepository
    {
        private readonly IApplicationDbContext _context;
        public ProductionRepository(IApplicationDbContext context)
        {
            _context = context;
        }
        public async Task<IEnumerable<Production>> GetAllAsync()
        {
            return await _context.Productions.ToListAsync();
        }
        public async Task<Production> GetByIdAsync(int id)
        {
            return await _context.Productions.FindAsync(id);
        }
        public async Task AddAsync(Production production)
        {
            await _context.Productions.AddAsync(production);
            _context.SaveChanges();
        }
    }
}
