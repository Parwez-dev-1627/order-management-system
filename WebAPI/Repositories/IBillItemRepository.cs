using System.Collections.Generic;
using System.Threading.Tasks;
using WebAPI.Entities;

namespace WebAPI.Repositories
{
    public interface IBillItemRepository
    {
        Task<IEnumerable<BillItem>> GetAllAsync();
        Task<BillItem> GetByIdAsync(int id);
        Task AddAsync(BillItem billItem);
    }
}
