using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using WebAPI.Data;
using WebAPI.Entities;

namespace WebAPI.Repositories
{
    public class RolePermissionRepository : IRolePermissionRepository
    {
        private readonly IApplicationDbContext _context;
        public RolePermissionRepository(IApplicationDbContext context)
        {
            _context = context;
        }
        public async Task<IEnumerable<RolePermission>> GetAllAsync()
        {
            return await _context.RolePermissions.ToListAsync();
        }
        public async Task<RolePermission> GetByIdAsync(int id)
        {
            return await _context.RolePermissions.FindAsync(id);
        }
        public async Task AddAsync(RolePermission rolePermission)
        {
            await _context.RolePermissions.AddAsync(rolePermission);
            _context.SaveChanges();
        }
    }
}
