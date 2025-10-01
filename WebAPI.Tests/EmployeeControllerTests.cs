using Xunit;
using Moq;
using WebAPI.Controllers;
using WebAPI.Repositories;
using WebAPI.Entities;
using WebAPI.DTOs;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace WebAPI.Tests
{
    public class EmployeeControllerTests
    {
        [Fact]
        public async Task GetAll_ReturnsEmployeesList()
        {
            var mockRepo = new Mock<IEmployeeRepository>();
            mockRepo.Setup(r => r.GetAllAsync()).ReturnsAsync(new List<Employee> {
                new Employee { EmployeeId = 1, EmpCode = "E001", Name = "Alice", Username = "alice", RoleId = 1, AddressId = 1, Inactive = false }
            });
            var controller = new EmployeeController(mockRepo.Object);
            var result = await controller.GetAll();
            var okResult = Assert.IsType<OkObjectResult>(result);
            var employees = Assert.IsType<List<EmployeeDto>>(okResult.Value);
            Assert.Single(employees);
            Assert.Equal("Alice", employees[0].Name);
        }

        [Fact]
        public async Task Get_ReturnsEmployeeOrNotFound()
        {
            var mockRepo = new Mock<IEmployeeRepository>();
            mockRepo.Setup(r => r.GetByIdAsync(1)).ReturnsAsync(new Employee { EmployeeId = 1, EmpCode = "E001", Name = "Alice", Username = "alice", RoleId = 1, AddressId = 1, Inactive = false });
            mockRepo.Setup(r => r.GetByIdAsync(2)).ReturnsAsync((Employee)null);
            var controller = new EmployeeController(mockRepo.Object);
            var found = await controller.Get(1);
            var okResult = Assert.IsType<OkObjectResult>(found);
            var employee = Assert.IsType<EmployeeDto>(okResult.Value);
            Assert.Equal(1, employee.EmployeeId);
            var notFound = await controller.Get(2);
            Assert.IsType<NotFoundResult>(notFound);
        }

        [Fact]
        public async Task Create_ReturnsCreated()
        {
            var mockRepo = new Mock<IEmployeeRepository>();
            mockRepo.Setup(r => r.AddAsync(It.IsAny<Employee>())).Returns(Task.CompletedTask);
            var controller = new EmployeeController(mockRepo.Object);
            var dto = new EmployeeDto { EmpCode = "E001", Name = "Alice", Username = "alice", RoleId = 1, AddressId = 1, Inactive = false };
            var result = await controller.Create(dto);
            Assert.IsType<CreatedAtActionResult>(result);
        }
    }
}
