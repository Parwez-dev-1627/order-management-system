using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using WebAPI.Data;
using WebAPI.Entities;

namespace WebAPI.Repositories
{
    public class ItemMasterRepository : IItemMasterRepository
    {
        private readonly IApplicationDbContext _context;
        public ItemMasterRepository(IApplicationDbContext context)
        {
            _context = context;
        }
        public async Task<IEnumerable<ItemMaster>> GetAllAsync()
        {
            return await _context.ItemMasters.ToListAsync();
        }
        public async Task<ItemMaster> GetByIdAsync(int id)
        {
            return await _context.ItemMasters.FindAsync(id);
        }
        public async Task AddAsync(ItemMaster itemMaster)
        {
            await _context.ItemMasters.AddAsync(itemMaster);
            _context.SaveChanges();
        }
    }
}
