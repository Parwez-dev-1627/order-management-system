using System.Collections.Generic;
using System.Threading.Tasks;
using WebAPI.Entities;

namespace WebAPI.Repositories
{
    public interface IDispatchRepository
    {
        Task<IEnumerable<Dispatch>> GetAllAsync();
        Task<Dispatch> GetByIdAsync(int id);
        Task AddAsync(Dispatch dispatch);
    }
}
