using System.Collections.Generic;
using System.Threading.Tasks;
using WebAPI.Entities;

namespace WebAPI.Repositories
{
    public interface IItemMasterRepository
    {
        Task<IEnumerable<ItemMaster>> GetAllAsync();
        Task<ItemMaster> GetByIdAsync(int id);
        Task AddAsync(ItemMaster itemMaster);
    }
}
