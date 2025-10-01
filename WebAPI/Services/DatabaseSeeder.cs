using System;
using System.Linq;
using WebAPI.Data;
using WebAPI.Entities;

namespace WebAPI.Services
{
    public class DatabaseSeeder
    {
        public static void Seed(ApplicationDbContext context)
        {
            // Country
            if (!context.Countries.Any())
            {
                for (int i = 1; i <= 5; i++)
                {
                    context.Countries.Add(new Country { CountryName = $"Country{i}", CountryCode = $"C{i}" });
                }
                context.SaveChanges();
            }
            // State
            if (!context.States.Any())
            {
                for (int i = 1; i <= 5; i++)
                {
                    context.States.Add(new State { StateName = $"State{i}", StateCode = $"S{i}", CountryId = 1 });
                }
                context.SaveChanges();
            }
            // City
            if (!context.Cities.Any())
            {
                for (int i = 1; i <= 5; i++)
                {
                    context.Cities.Add(new City { CityName = $"City{i}", Pincode = $"1000{i}", StateId = 1 });
                }
                context.SaveChanges();
            }
            // Address
            if (!context.Addresses.Any())
            {
                for (int i = 1; i <= 5; i++)
                {
                    context.Addresses.Add(new Address { AddressLine1 = $"Line1-{i}", AddressLine2 = $"Line2-{i}", Landmark = $"Landmark{i}", CityId = 1, AddressType = "Home" });
                }
                context.SaveChanges();
            }
            // Distributor
            if (!context.Distributors.Any())
            {
                for (int i = 1; i <= 5; i++)
                {
                    context.Distributors.Add(new Distributor { Name = $"Distributor{i}", ContactNo = $"90000000{i}", Email = $"dist{i}@test.com", AddressId = 1 });
                }
                context.SaveChanges();
            }
            // Customer
            if (!context.Customers.Any())
            {
                for (int i = 1; i <= 5; i++)
                {
                    context.Customers.Add(new Customer { Name = $"Customer{i}", ContactNo = $"80000000{i}", DistributorId = 1, AddressId = 1 });
                }
                context.SaveChanges();
            }
            // Role
            if (!context.Roles.Any())
            {
                for (int i = 1; i <= 5; i++)
                {
                    context.Roles.Add(new Role { RoleName = $"Role{i}", Description = $"Role Desc {i}" });
                }
                context.SaveChanges();
            }
            // Employee
            if (!context.Employees.Any())
            {
                // Get valid RoleIds
                var roleIds = context.Roles.Select(r => r.RoleId).Take(5).ToList();
                for (int i = 1; i <= 5; i++)
                {
                    context.Employees.Add(new Employee { EmpCode = $"E{i}", Name = $"Employee{i}", Username = $"emp{i}", Password = "pass", RoleId = roleIds[(i-1)%roleIds.Count], AddressId = 1 });
                }
                context.SaveChanges();
            }
            // Permission
            if (!context.Permissions.Any())
            {
                for (int i = 1; i <= 5; i++)
                {
                    context.Permissions.Add(new Permission { PermissionName = $"Permission{i}", Module = "Module", Action = "Read" });
                }
                context.SaveChanges();
            }
            // RolePermission
            if (!context.RolePermissions.Any())
            {
                for (int i = 1; i <= 5; i++)
                {
                    context.RolePermissions.Add(new RolePermission { RoleId = 1, PermissionId = i });
                }
                context.SaveChanges();
            }
            // ItemMaster
            if (!context.ItemMasters.Any())
            {
                for (int i = 1; i <= 5; i++)
                {
                    context.ItemMasters.Add(new ItemMaster { ItemCode = $"IC{i}", ItemName = $"Item{i}", PrintType = "TypeA", Colour1 = "Red", Colour2 = "Blue", PcPerBox = 10, PcPerSheet = 5, PaperGsm = 80 });
                }
                context.SaveChanges();
            }
            // Order
            if (!context.Orders.Any())
            {
                for (int i = 1; i <= 5; i++)
                {
                    context.Orders.Add(new Order { Shop = $"Shop{i}", PoNo = $"PO{i}", TallyPoNo = $"TPO{i}", DistributorId = 1, CustomerId = 1, Remark = $"Remark{i}" });
                }
                context.SaveChanges();
            }
            // OrderItem
            if (!context.OrderItems.Any())
            {
                var orderIds = context.Orders.Select(o => o.OrderId).Take(5).ToList();
                var itemMasterIds = context.ItemMasters.Select(im => im.ItemId).Take(5).ToList();
                for (int i = 0; i < Math.Min(orderIds.Count, itemMasterIds.Count); i++)
                {
                    context.OrderItems.Add(new OrderItem {
                        OrderId = orderIds[i],
                        ItemMasterId = itemMasterIds[i],
                        Quantity = 10 + i,
                        Rate = 100 + i
                    });
                }
                context.SaveChanges();
            }
            // Printing
            if (!context.Printings.Any())
            {
                var orderItemIds = context.OrderItems.Select(oi => oi.OrderItemId).Take(5).ToList();
                for (int i = 0; i < orderItemIds.Count; i++)
                {
                    context.Printings.Add(new Printing { OrderItemId = orderItemIds[i], Status = "Printed" });
                }
                context.SaveChanges();
            }
            // Production
            if (!context.Productions.Any())
            {
                var printingIds = context.Printings.Select(p => p.PrintingId).Take(5).ToList();
                for (int i = 0; i < printingIds.Count; i++)
                {
                    context.Productions.Add(new Production { PrintingId = printingIds[i], Status = "Done" });
                }
                context.SaveChanges();
            }
            // Dispatch
            if (!context.Dispatches.Any())
            {
                var orderItemIds = context.OrderItems.Select(oi => oi.OrderItemId).Take(5).ToList();
                for (int i = 0; i < orderItemIds.Count; i++)
                {
                    context.Dispatches.Add(new Dispatch { OrderItemId = orderItemIds[i], Status = "Dispatched" });
                }
                context.SaveChanges();
            }
            // Billing
            if (!context.Billings.Any())
            {
                for (int i = 1; i <= 5; i++)
                {
                    context.Billings.Add(new Billing { BillNo = $"BILL{i}", BillDate = DateTime.UtcNow, CustomerId = 1, TotalAmount = 1000 + i, Status = "Paid" });
                }
                context.SaveChanges();
            }
            // BillItem
            if (!context.BillItems.Any())
            {
                var billingIds = context.Billings.Select(b => b.BillId).Take(5).ToList();
                var dispatchIds = context.Dispatches.Select(d => d.DispatchId).Take(5).ToList();
                for (int i = 0; i < Math.Min(billingIds.Count, dispatchIds.Count); i++)
                {
                    context.BillItems.Add(new BillItem {
                        BillingId = billingIds[i],
                        DispatchId = dispatchIds[i],
                        Amount = 200 + i
                    });
                }
                context.SaveChanges();
            }
        }
    }
}
