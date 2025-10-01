using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using WebAPI.Data;
using WebAPI.Entities;

namespace WebAPI.Repositories
{
    public class DispatchRepository : IDispatchRepository
    {
        private readonly IApplicationDbContext _context;
        public DispatchRepository(IApplicationDbContext context)
        {
            _context = context;
        }
        public async Task<IEnumerable<Dispatch>> GetAllAsync()
        {
            return await _context.Dispatches.ToListAsync();
        }
        public async Task<Dispatch> GetByIdAsync(int id)
        {
            return await _context.Dispatches.FindAsync(id);
        }
        public async Task AddAsync(Dispatch dispatch)
        {
            await _context.Dispatches.AddAsync(dispatch);
            _context.SaveChanges();
        }
    }
}
