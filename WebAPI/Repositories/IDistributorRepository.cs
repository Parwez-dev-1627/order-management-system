using System.Collections.Generic;
using System.Threading.Tasks;
using WebAPI.Entities;

namespace WebAPI.Repositories
{
    public interface IDistributorRepository
    {
        Task<IEnumerable<Distributor>> GetAllAsync();
        Task<Distributor> GetByIdAsync(int id);
        Task AddAsync(Distributor distributor);
    }
}
