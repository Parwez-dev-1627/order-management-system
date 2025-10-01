using Microsoft.EntityFrameworkCore;
using WebAPI.Entities;

namespace WebAPI.Data
{
	public class ApplicationDbContext : DbContext, IApplicationDbContext
	{
		public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options) { }

	public DbSet<Country> Countries { get; set; }
	public DbSet<State> States { get; set; }
	public DbSet<City> Cities { get; set; }
	public DbSet<Address> Addresses { get; set; }
	public DbSet<Distributor> Distributors { get; set; }
	public DbSet<Customer> Customers { get; set; }
	public DbSet<Employee> Employees { get; set; }
	public DbSet<Role> Roles { get; set; }
	public DbSet<Permission> Permissions { get; set; }
	public DbSet<RolePermission> RolePermissions { get; set; }
	public DbSet<ItemMaster> ItemMasters { get; set; }
	public DbSet<Order> Orders { get; set; }
	public DbSet<OrderItem> OrderItems { get; set; }
	public DbSet<Printing> Printings { get; set; }
	public DbSet<Production> Productions { get; set; }
	public DbSet<Dispatch> Dispatches { get; set; }
	public DbSet<Billing> Billings { get; set; }
	public DbSet<BillItem> BillItems { get; set; }
		public override async Task<int> SaveChangesAsync(CancellationToken cancellationToken = default)
		{
			return await base.SaveChangesAsync(cancellationToken);
		}
	}
}