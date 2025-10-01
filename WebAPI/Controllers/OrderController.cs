using Microsoft.AspNetCore.Mvc;
using WebAPI.Data;
using WebAPI.Entities;
using WebAPI.DTOs;

namespace WebAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class OrderController : ControllerBase
    {
        private readonly WebAPI.Repositories.IOrderRepository _orderRepository;
        public OrderController(WebAPI.Repositories.IOrderRepository orderRepository)
        {
            _orderRepository = orderRepository;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var orders = (await _orderRepository.GetAllAsync()).Select(o => new OrderDto
            {
                OrderId = o.OrderId,
                Shop = o.Shop,
                PoNo = o.PoNo,
                PoDate = o.PoDate,
                TallyPoNo = o.TallyPoNo,
                DistributorId = o.DistributorId,
                CustomerId = o.CustomerId,
                EntryBy = o.EntryBy,
                Remark = o.Remark,
                CreatedAt = o.CreatedAt,
                Status = o.Status
            }).ToList();
            return Ok(orders);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> Get(int id)
        {
            var order = await _orderRepository.GetByIdAsync(id);
            if (order == null) return NotFound();
            return Ok(new OrderDto
            {
                OrderId = order.OrderId,
                Shop = order.Shop,
                PoNo = order.PoNo,
                PoDate = order.PoDate,
                TallyPoNo = order.TallyPoNo,
                DistributorId = order.DistributorId,
                CustomerId = order.CustomerId,
                EntryBy = order.EntryBy,
                Remark = order.Remark,
                CreatedAt = order.CreatedAt,
                Status = order.Status
            });
        }

        [HttpPost]
        public async Task<IActionResult> Create(OrderDto dto)
        {
            // Basic validation for required fields
            if (string.IsNullOrWhiteSpace(dto.Shop) ||
                string.IsNullOrWhiteSpace(dto.PoNo) ||
                dto.PoDate == default(DateTime) ||
                string.IsNullOrWhiteSpace(dto.TallyPoNo) ||
                dto.DistributorId <= 0 ||
                dto.CustomerId <= 0 ||
                dto.EntryBy <= 0 ||
                string.IsNullOrWhiteSpace(dto.Remark))
            {
                return BadRequest("Missing or invalid required fields.");
            }

            var order = new Order
            {
                Shop = dto.Shop,
                PoNo = dto.PoNo,
                PoDate = dto.PoDate,
                TallyPoNo = dto.TallyPoNo,
                DistributorId = dto.DistributorId,
                CustomerId = dto.CustomerId,
                EntryBy = dto.EntryBy,
                Remark = dto.Remark,
                CreatedAt = dto.CreatedAt ?? DateTime.UtcNow
            };
            await _orderRepository.AddAsync(order);
            dto.OrderId = order.OrderId;
            return CreatedAtAction(nameof(Get), new { id = order.OrderId }, dto);
        }
        // ...existing code...

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, OrderDto dto)
        {
            var order = await _orderRepository.GetByIdAsync(id);
            if (order == null) return NotFound();

            // Basic validation for required fields
            if (string.IsNullOrWhiteSpace(dto.Shop) ||
                string.IsNullOrWhiteSpace(dto.PoNo) ||
                dto.PoDate == default(DateTime) ||
                string.IsNullOrWhiteSpace(dto.TallyPoNo) ||
                dto.DistributorId <= 0 ||
                dto.CustomerId <= 0 ||
                dto.EntryBy <= 0 ||
                string.IsNullOrWhiteSpace(dto.Remark))
            {
                return BadRequest("Missing or invalid required fields.");
            }

            order.Shop = dto.Shop;
            order.PoNo = dto.PoNo;
            order.PoDate = dto.PoDate;
            order.TallyPoNo = dto.TallyPoNo;
            order.DistributorId = dto.DistributorId;
            order.CustomerId = dto.CustomerId;
            order.EntryBy = dto.EntryBy;
            order.Remark = dto.Remark;
            order.Status = dto.Status;
            // CreatedAt remains unchanged

            await _orderRepository.UpdateAsync(order);

            return Ok(new OrderDto
            {
                OrderId = order.OrderId,
                Shop = order.Shop,
                PoNo = order.PoNo,
                PoDate = order.PoDate,
                TallyPoNo = order.TallyPoNo,
                DistributorId = order.DistributorId,
                CustomerId = order.CustomerId,
                EntryBy = order.EntryBy,
                Remark = order.Remark,
                CreatedAt = order.CreatedAt
            });
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var order = await _orderRepository.GetByIdAsync(id);
            if (order == null) return NotFound();
            await _orderRepository.DeleteAsync(order);
            return NoContent();
        }
    }
}