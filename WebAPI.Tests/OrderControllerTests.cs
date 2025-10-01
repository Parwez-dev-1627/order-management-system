using Xunit;
using Moq;
using WebAPI.Controllers;
using WebAPI.Repositories;
using WebAPI.Entities;
using WebAPI.DTOs;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;
using System;

namespace WebAPI.Tests
{
    public class OrderControllerTests
    {
        [Fact]
        public async Task GetAll_ReturnsOrdersList()
        {
            var mockRepo = new Mock<IOrderRepository>();
            mockRepo.Setup(r => r.GetAllAsync()).ReturnsAsync(new List<Order> {
                new Order { OrderId = 1, Shop = "Shop1", PoNo = "PO1", PoDate = DateTime.Today, TallyPoNo = "T1", DistributorId = 1, CustomerId = 1, EntryBy = 1, Remark = "Remark", CreatedAt = DateTime.Today }
            });
            var controller = new OrderController(mockRepo.Object);
            var result = await controller.GetAll();
            var okResult = Assert.IsType<OkObjectResult>(result);
            var orders = Assert.IsType<List<OrderDto>>(okResult.Value);
            Assert.Single(orders);
            Assert.Equal("Shop1", orders[0].Shop);
        }

        [Fact]
        public async Task Get_ReturnsOrderOrNotFound()
        {
            var mockRepo = new Mock<IOrderRepository>();
            mockRepo.Setup(r => r.GetByIdAsync(1)).ReturnsAsync(new Order { OrderId = 1, Shop = "Shop1", PoNo = "PO1", PoDate = DateTime.Today, TallyPoNo = "T1", DistributorId = 1, CustomerId = 1, EntryBy = 1, Remark = "Remark", CreatedAt = DateTime.Today });
            mockRepo.Setup(r => r.GetByIdAsync(2)).ReturnsAsync((Order)null);
            var controller = new OrderController(mockRepo.Object);
            var found = await controller.Get(1);
            var okResult = Assert.IsType<OkObjectResult>(found);
            var order = Assert.IsType<OrderDto>(okResult.Value);
            Assert.Equal(1, order.OrderId);
            var notFound = await controller.Get(2);
            Assert.IsType<NotFoundResult>(notFound);
        }

        [Fact]
        public async Task Create_ReturnsCreatedOrBadRequest()
        {
            var mockRepo = new Mock<IOrderRepository>();
            mockRepo.Setup(r => r.AddAsync(It.IsAny<Order>())).Returns(Task.CompletedTask);
            var controller = new OrderController(mockRepo.Object);
            var validDto = new OrderDto { Shop = "Shop1", PoNo = "PO1", PoDate = DateTime.Today, TallyPoNo = "T1", DistributorId = 1, CustomerId = 1, EntryBy = 1, Remark = "Remark" };
            var result = await controller.Create(validDto);
            Assert.IsType<CreatedAtActionResult>(result);
            var invalidDto = new OrderDto { Shop = "", PoNo = "", PoDate = default, TallyPoNo = "", DistributorId = 0, CustomerId = 0, EntryBy = 0, Remark = "" };
            var badResult = await controller.Create(invalidDto);
            Assert.IsType<BadRequestObjectResult>(badResult);
        }

        [Fact]
        public async Task Update_ReturnsOkOrNotFoundOrBadRequest()
        {
            var mockRepo = new Mock<IOrderRepository>();
            var order = new Order { OrderId = 1, Shop = "Shop1", PoNo = "PO1", PoDate = DateTime.Today, TallyPoNo = "T1", DistributorId = 1, CustomerId = 1, EntryBy = 1, Remark = "Remark", CreatedAt = DateTime.Today };
            mockRepo.Setup(r => r.GetByIdAsync(1)).ReturnsAsync(order);
            mockRepo.Setup(r => r.GetByIdAsync(2)).ReturnsAsync((Order)null);
            mockRepo.Setup(r => r.UpdateAsync(It.IsAny<Order>())).Returns(Task.CompletedTask);
            var controller = new OrderController(mockRepo.Object);
            var validDto = new OrderDto { Shop = "Shop2", PoNo = "PO2", PoDate = DateTime.Today, TallyPoNo = "T2", DistributorId = 2, CustomerId = 2, EntryBy = 2, Remark = "Remark2" };
            var okResult = await controller.Update(1, validDto);
            Assert.IsType<OkObjectResult>(okResult);
            var notFound = await controller.Update(2, validDto);
            Assert.IsType<NotFoundResult>(notFound);
            var badDto = new OrderDto { Shop = "", PoNo = "", PoDate = default, TallyPoNo = "", DistributorId = 0, CustomerId = 0, EntryBy = 0, Remark = "" };
            var badResult = await controller.Update(1, badDto);
            Assert.IsType<BadRequestObjectResult>(badResult);
        }

        [Fact]
        public async Task Delete_ReturnsNoContentOrNotFound()
        {
            var mockRepo = new Mock<IOrderRepository>();
            var order = new Order { OrderId = 1 };
            mockRepo.Setup(r => r.GetByIdAsync(1)).ReturnsAsync(order);
            mockRepo.Setup(r => r.GetByIdAsync(2)).ReturnsAsync((Order)null);
            mockRepo.Setup(r => r.DeleteAsync(order)).Returns(Task.CompletedTask);
            var controller = new OrderController(mockRepo.Object);
            var noContent = await controller.Delete(1);
            Assert.IsType<NoContentResult>(noContent);
            var notFound = await controller.Delete(2);
            Assert.IsType<NotFoundResult>(notFound);
        }
    }
}
