using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using WebAPI.Data;
using WebAPI.Entities;

namespace WebAPI.Repositories
{
    public class PermissionRepository : IPermissionRepository
    {
        private readonly IApplicationDbContext _context;
        public PermissionRepository(IApplicationDbContext context)
        {
            _context = context;
        }
        public async Task<IEnumerable<Permission>> GetAllAsync()
        {
            return await _context.Permissions.ToListAsync();
        }
        public async Task<Permission> GetByIdAsync(int id)
        {
            return await _context.Permissions.FindAsync(id);
        }
        public async Task AddAsync(Permission permission)
        {
            await _context.Permissions.AddAsync(permission);
            _context.SaveChanges();
        }
    }
}
