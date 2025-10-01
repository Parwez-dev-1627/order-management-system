using Microsoft.AspNetCore.Mvc;
using WebAPI.Data;
using WebAPI.Entities;
using WebAPI.DTOs;

namespace WebAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class OrderItemController : ControllerBase
    {
        private readonly WebAPI.Repositories.IOrderItemRepository _orderItemRepository;
        public OrderItemController(WebAPI.Repositories.IOrderItemRepository orderItemRepository)
        {
            _orderItemRepository = orderItemRepository;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var orderItems = (await _orderItemRepository.GetAllAsync()).Select(oi => new OrderItemDto
            {
                 OrderItemId = oi.OrderItemId,
                 OrderId = oi.OrderId,
                 ItemMasterId = oi.ItemMasterId,
                 Quantity = oi.Quantity,
                 Rate = oi.Rate,
                 PcPerBox = oi.PcPerBox,
                 TotalQty = oi.TotalQty,
                 PcPerSheet = oi.PcPerSheet,
                 NoOfSheets = oi.NoOfSheets
            }).ToList();
            return Ok(orderItems);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> Get(int id)
        {
            var orderItem = await _orderItemRepository.GetByIdAsync(id);
            if (orderItem == null) return NotFound();
            return Ok(new OrderItemDto
            {
                OrderItemId = orderItem.OrderItemId,
                OrderId = orderItem.OrderId,
                ItemMasterId = orderItem.ItemMasterId,
                Quantity = orderItem.Quantity,
                Rate = orderItem.Rate,
                PcPerBox = orderItem.PcPerBox,
                TotalQty = orderItem.TotalQty,
                PcPerSheet = orderItem.PcPerSheet,
                NoOfSheets = orderItem.NoOfSheets
            });
        }

        [HttpPost]
        public async Task<IActionResult> Create(OrderItemDto dto)
        {
            var orderItem = new OrderItem
            {
                OrderId = dto.OrderId,
                ItemMasterId = dto.ItemMasterId,
                Quantity = dto.Quantity,
                Rate = dto.Rate,
                PcPerBox = dto.PcPerBox,
                TotalQty = dto.TotalQty,
                PcPerSheet = dto.PcPerSheet,
                NoOfSheets = dto.NoOfSheets
            };
            await _orderItemRepository.AddAsync(orderItem);
            dto.OrderItemId = orderItem.OrderItemId;
            return CreatedAtAction(nameof(Get), new { id = orderItem.OrderItemId }, dto);
        }
    }
}