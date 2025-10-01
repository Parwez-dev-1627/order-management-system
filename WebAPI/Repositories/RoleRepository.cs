using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using WebAPI.Data;
using WebAPI.Entities;

namespace WebAPI.Repositories
{
    public class RoleRepository : IRoleRepository
    {
        private readonly IApplicationDbContext _context;
        public RoleRepository(IApplicationDbContext context)
        {
            _context = context;
        }
        public async Task<IEnumerable<Role>> GetAllAsync()
        {
            return await _context.Roles.ToListAsync();
        }
        public async Task<Role> GetByIdAsync(int id)
        {
            return await _context.Roles.FindAsync(id);
        }
        public async Task AddAsync(Role role)
        {
            await _context.Roles.AddAsync(role);
            _context.SaveChanges();
        }
    }
}
