using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using WebAPI.Data;
using WebAPI.Entities;

namespace WebAPI.Repositories
{
    public class StateRepository : IStateRepository
    {
        private readonly IApplicationDbContext _context;
        public StateRepository(IApplicationDbContext context)
        {
            _context = context;
        }
        public async Task<IEnumerable<State>> GetAllAsync()
        {
            return await _context.States.ToListAsync();
        }
        public async Task<State> GetByIdAsync(int id)
        {
            return await _context.States.FindAsync(id);
        }
        public async Task AddAsync(State state)
        {
            await _context.States.AddAsync(state);
            _context.SaveChanges();
        }
    }
}
