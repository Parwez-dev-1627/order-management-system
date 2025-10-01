using Microsoft.EntityFrameworkCore;
using WebAPI.Entities;

namespace WebAPI.Data
{
    public interface IApplicationDbContext
    {
    DbSet<Country> Countries { get; set; }
    DbSet<State> States { get; set; }
    DbSet<City> Cities { get; set; }
    DbSet<Address> Addresses { get; set; }
    DbSet<Distributor> Distributors { get; set; }
    DbSet<Customer> Customers { get; set; }
    DbSet<Employee> Employees { get; set; }
    DbSet<Role> Roles { get; set; }
    DbSet<Permission> Permissions { get; set; }
    DbSet<RolePermission> RolePermissions { get; set; }
    DbSet<ItemMaster> ItemMasters { get; set; }
    DbSet<Order> Orders { get; set; }
    DbSet<OrderItem> OrderItems { get; set; }
    DbSet<Printing> Printings { get; set; }
    DbSet<Production> Productions { get; set; }
    DbSet<Dispatch> Dispatches { get; set; }
    DbSet<Billing> Billings { get; set; }
    DbSet<BillItem> BillItems { get; set; }
    int SaveChanges();
    Task<int> SaveChangesAsync(CancellationToken cancellationToken = default);

    }
}
