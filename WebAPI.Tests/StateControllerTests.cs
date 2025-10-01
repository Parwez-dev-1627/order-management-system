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
    public class StateControllerTests
    {
        [Fact]
        public async Task GetAll_ReturnsStatesList()
        {
            var mockRepo = new Mock<IStateRepository>();
            mockRepo.Setup(r => r.GetAllAsync()).ReturnsAsync(new List<State> {
                new State { StateId = 1, StateName = "California", StateCode = "CA", CountryId = 1 }
            });
            var controller = new StateController(mockRepo.Object);
            var result = await controller.GetAll();
            var okResult = Assert.IsType<OkObjectResult>(result);
            var states = Assert.IsType<List<StateDto>>(okResult.Value);
            Assert.Single(states);
            Assert.Equal("California", states[0].StateName);
        }

        [Fact]
        public async Task Get_ReturnsStateOrNotFound()
        {
            var mockRepo = new Mock<IStateRepository>();
            mockRepo.Setup(r => r.GetByIdAsync(1)).ReturnsAsync(new State { StateId = 1, StateName = "California", StateCode = "CA", CountryId = 1 });
            mockRepo.Setup(r => r.GetByIdAsync(2)).ReturnsAsync((State)null);
            var controller = new StateController(mockRepo.Object);
            var found = await controller.Get(1);
            var okResult = Assert.IsType<OkObjectResult>(found);
            var state = Assert.IsType<StateDto>(okResult.Value);
            Assert.Equal(1, state.StateId);
            var notFound = await controller.Get(2);
            Assert.IsType<NotFoundResult>(notFound);
        }

        [Fact]
        public async Task Create_ReturnsCreated()
        {
            var mockRepo = new Mock<IStateRepository>();
            mockRepo.Setup(r => r.AddAsync(It.IsAny<State>())).Returns(Task.CompletedTask);
            var controller = new StateController(mockRepo.Object);
            var dto = new StateDto { StateName = "California", StateCode = "CA", CountryId = 1 };
            var result = await controller.Create(dto);
            Assert.IsType<CreatedAtActionResult>(result);
        }
    }
}
