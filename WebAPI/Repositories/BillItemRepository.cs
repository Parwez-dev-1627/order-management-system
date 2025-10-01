using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using WebAPI.Data;
using WebAPI.Entities;

namespace WebAPI.Repositories
{
    public class BillItemRepository : IBillItemRepository
    {
        private readonly IApplicationDbContext _context;
        public BillItemRepository(IApplicationDbContext context)
        {
            _context = context;
        }
        public async Task<IEnumerable<BillItem>> GetAllAsync()
        {
            return await _context.BillItems.ToListAsync();
        }
        public async Task<BillItem> GetByIdAsync(int id)
        {
            return await _context.BillItems.FindAsync(id);
        }
        public async Task AddAsync(BillItem billItem)
        {
            await _context.BillItems.AddAsync(billItem);
            _context.SaveChanges();
        }
    }
}
