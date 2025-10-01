using Microsoft.AspNetCore.Mvc;
using WebAPI.Data;
using WebAPI.Entities;
using WebAPI.DTOs;

namespace WebAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class BillItemController : ControllerBase
    {
        private readonly WebAPI.Repositories.IBillItemRepository _billItemRepository;
        public BillItemController(WebAPI.Repositories.IBillItemRepository billItemRepository)
        {
            _billItemRepository = billItemRepository;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var billItems = (await _billItemRepository.GetAllAsync()).Select(bi => new BillItemDto
            {
                BillItemId = bi.BillItemId,
                BillingId = bi.BillingId,
                DispatchId = bi.DispatchId,
                Quantity = bi.Quantity,
                Rate = bi.Rate,
                Amount = bi.Amount
            }).ToList();
            return Ok(billItems);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> Get(int id)
        {
            var billItem = await _billItemRepository.GetByIdAsync(id);
            if (billItem == null) return NotFound();
            return Ok(new BillItemDto
            {
                BillItemId = billItem.BillItemId,
                BillingId = billItem.BillingId,
                DispatchId = billItem.DispatchId,
                Quantity = billItem.Quantity,
                Rate = billItem.Rate,
                Amount = billItem.Amount
            });
        }

        [HttpPost]
        public async Task<IActionResult> Create(BillItemDto dto)
        {
            var billItem = new BillItem
            {
                BillingId = dto.BillingId,
                DispatchId = dto.DispatchId,
                Quantity = dto.Quantity,
                Rate = dto.Rate,
                Amount = dto.Amount
            };
            await _billItemRepository.AddAsync(billItem);
            dto.BillItemId = billItem.BillItemId;
            return CreatedAtAction(nameof(Get), new { id = billItem.BillItemId }, dto);
        }
    }
}