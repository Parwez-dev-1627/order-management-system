using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using WebAPI.Data;
using WebAPI.Entities;

namespace WebAPI.Repositories
{
    public class BillingRepository : IBillingRepository
    {
        private readonly IApplicationDbContext _context;
        public BillingRepository(IApplicationDbContext context)
        {
            _context = context;
        }
        public async Task<IEnumerable<Billing>> GetAllAsync()
        {
            return await _context.Billings.ToListAsync();
        }
        public async Task<Billing> GetByIdAsync(int id)
        {
            return await _context.Billings.FindAsync(id);
        }
        public async Task AddAsync(Billing billing)
        {
            await _context.Billings.AddAsync(billing);
            _context.SaveChanges();
        }
    }
}
