using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using WebAPI.Data;
using WebAPI.Entities;

namespace WebAPI.Repositories
{
    public class PrintingRepository : IPrintingRepository
    {
        private readonly IApplicationDbContext _context;
        public PrintingRepository(IApplicationDbContext context)
        {
            _context = context;
        }
        public async Task<IEnumerable<Printing>> GetAllAsync()
        {
            return await _context.Printings.ToListAsync();
        }
        public async Task<Printing> GetByIdAsync(int id)
        {
            return await _context.Printings.FindAsync(id);
        }
        public async Task AddAsync(Printing printing)
        {
            await _context.Printings.AddAsync(printing);
            _context.SaveChanges();
        }
    }
}
