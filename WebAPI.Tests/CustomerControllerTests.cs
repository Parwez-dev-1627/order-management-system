using Xunit;
using WebAPI.Controllers;
using Moq;
using WebAPI.Repositories;
using WebAPI.Entities;
using WebAPI.DTOs;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace WebAPI.Tests
{
    public class CustomerControllerTests
    {
        [Fact]
        public async Task GetAll_ReturnsOkResultWithCustomers()
        {
            var mockRepo = new Mock<ICustomerRepository>();
            mockRepo.Setup(repo => repo.GetAllAsync()).ReturnsAsync(new List<Customer>
            {
                new Customer { CustomerId = 1, Name = "John Doe", ContactNo = "1234567890", DistributorId = 1, AddressId = 1, Inactive = false }
            });
            var controller = new CustomerController(mockRepo.Object);
            var result = await controller.GetAll();
            var okResult = Assert.IsType<OkObjectResult>(result);
            var customers = Assert.IsType<List<CustomerDto>>(okResult.Value);
            Assert.Single(customers);
            Assert.Equal("John Doe", customers[0].Name);
        }

        [Fact]
        public async Task Get_ReturnsCustomerOrNotFound()
        {
            var mockRepo = new Mock<ICustomerRepository>();
            mockRepo.Setup(r => r.GetByIdAsync(1)).ReturnsAsync(new Customer { CustomerId = 1, Name = "John Doe", ContactNo = "1234567890", DistributorId = 1, AddressId = 1, Inactive = false });
            mockRepo.Setup(r => r.GetByIdAsync(2)).ReturnsAsync((Customer)null);
            var controller = new CustomerController(mockRepo.Object);
            var found = await controller.Get(1);
            var okResult = Assert.IsType<OkObjectResult>(found);
            var customer = Assert.IsType<CustomerDto>(okResult.Value);
            Assert.Equal(1, customer.CustomerId);
            var notFound = await controller.Get(2);
            Assert.IsType<NotFoundResult>(notFound);
        }

        [Fact]
        public async Task Create_ReturnsCreated()
        {
            var mockRepo = new Mock<ICustomerRepository>();
            mockRepo.Setup(r => r.AddAsync(It.IsAny<Customer>())).Returns(Task.CompletedTask);
            var controller = new CustomerController(mockRepo.Object);
            var dto = new CustomerDto { Name = "John Doe", ContactNo = "1234567890", DistributorId = 1, AddressId = 1, Inactive = false };
            var result = await controller.Create(dto);
            Assert.IsType<CreatedAtActionResult>(result);
        }
    }
}
