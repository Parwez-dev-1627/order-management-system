using System.Collections.Generic;
using System.Threading.Tasks;
using WebAPI.Entities;

namespace WebAPI.Repositories
{
    public interface IProductionRepository
    {
        Task<IEnumerable<Production>> GetAllAsync();
        Task<Production> GetByIdAsync(int id);
        Task AddAsync(Production production);
    }
}
