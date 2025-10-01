using System.Collections.Generic;
using System.Threading.Tasks;
using WebAPI.Entities;

namespace WebAPI.Repositories
{
    public interface IBillingRepository
    {
        Task<IEnumerable<Billing>> GetAllAsync();
        Task<Billing> GetByIdAsync(int id);
        Task AddAsync(Billing billing);
    }
}
