using WebAPI.Data;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Hosting;
using Microsoft.EntityFrameworkCore;
using Npgsql.EntityFrameworkCore.PostgreSQL;
var builder = WebApplication.CreateBuilder(args);

// Add services to the container
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowFrontend",
        corsBuilder => corsBuilder
            .WithOrigins("http://localhost:3000", "https://localhost:3000")
            .AllowAnyHeader()
            .AllowAnyMethod()
            .AllowCredentials()
    );
});
builder.Services.AddControllers();
builder.Services.AddSwaggerGen(c =>
{
    c.SwaggerDoc("v1", new Microsoft.OpenApi.Models.OpenApiInfo { Title = "Order Management API", Version = "v1" });
});
builder.Services.AddDbContext<ApplicationDbContext>(options =>
    options.UseNpgsql(builder.Configuration.GetConnectionString("DefaultConnection")));
builder.Services.AddScoped<IApplicationDbContext>(provider => provider.GetRequiredService<ApplicationDbContext>());
builder.Services.AddScoped<WebAPI.Repositories.ICountryRepository, WebAPI.Repositories.CountryRepository>();
builder.Services.AddScoped<WebAPI.Repositories.ICustomerRepository, WebAPI.Repositories.CustomerRepository>();
builder.Services.AddScoped<WebAPI.Repositories.IOrderRepository, WebAPI.Repositories.OrderRepository>();
builder.Services.AddScoped<WebAPI.Repositories.IItemMasterRepository, WebAPI.Repositories.ItemMasterRepository>();
builder.Services.AddScoped<WebAPI.Repositories.IBillingRepository, WebAPI.Repositories.BillingRepository>();
builder.Services.AddScoped<WebAPI.Repositories.ICityRepository, WebAPI.Repositories.CityRepository>();
builder.Services.AddScoped<WebAPI.Repositories.IStateRepository, WebAPI.Repositories.StateRepository>();
builder.Services.AddScoped<WebAPI.Repositories.IAddressRepository, WebAPI.Repositories.AddressRepository>();
builder.Services.AddScoped<WebAPI.Repositories.IDistributorRepository, WebAPI.Repositories.DistributorRepository>();
builder.Services.AddScoped<WebAPI.Repositories.IEmployeeRepository, WebAPI.Repositories.EmployeeRepository>();
builder.Services.AddScoped<WebAPI.Repositories.IRoleRepository, WebAPI.Repositories.RoleRepository>();
builder.Services.AddScoped<WebAPI.Repositories.IPermissionRepository, WebAPI.Repositories.PermissionRepository>();
builder.Services.AddScoped<WebAPI.Repositories.IRolePermissionRepository, WebAPI.Repositories.RolePermissionRepository>();
builder.Services.AddScoped<WebAPI.Repositories.IOrderItemRepository, WebAPI.Repositories.OrderItemRepository>();
builder.Services.AddScoped<WebAPI.Repositories.IPrintingRepository, WebAPI.Repositories.PrintingRepository>();
builder.Services.AddScoped<WebAPI.Repositories.IProductionRepository, WebAPI.Repositories.ProductionRepository>();
builder.Services.AddScoped<WebAPI.Repositories.IDispatchRepository, WebAPI.Repositories.DispatchRepository>();
builder.Services.AddScoped<WebAPI.Repositories.IBillItemRepository, WebAPI.Repositories.BillItemRepository>();

var app = builder.Build();


// Run migrations and seed database
using (var scope = app.Services.CreateScope())
{
    var context = scope.ServiceProvider.GetRequiredService<ApplicationDbContext>();
    context.Database.Migrate(); // Apply any pending migrations
    WebAPI.Services.DatabaseSeeder.Seed(context);
}

if (app.Environment.IsDevelopment())
{
    app.UseDeveloperExceptionPage();
}
app.UseSwagger();
app.UseSwaggerUI(c =>
{
    c.SwaggerEndpoint("/swagger/v1/swagger.json", "Order Management API V1");
    c.RoutePrefix = string.Empty;
});
app.UseRouting();
app.UseCors("AllowFrontend");
app.UseAuthorization();
app.MapControllers();

app.Run();
