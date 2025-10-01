using System.Collections.Generic;
using System.Threading.Tasks;
using WebAPI.Entities;

namespace WebAPI.Repositories
{
    public interface IPrintingRepository
    {
        Task<IEnumerable<Printing>> GetAllAsync();
        Task<Printing> GetByIdAsync(int id);
        Task AddAsync(Printing printing);
    }
}
