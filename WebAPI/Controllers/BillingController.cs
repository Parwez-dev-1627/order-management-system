using Microsoft.AspNetCore.Mvc;
using WebAPI.Data;
using WebAPI.Entities;
using WebAPI.DTOs;

namespace WebAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class BillingController : ControllerBase
    {
        private readonly WebAPI.Repositories.IBillingRepository _billingRepository;
        public BillingController(WebAPI.Repositories.IBillingRepository billingRepository)
        {
            _billingRepository = billingRepository;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var bills = (await _billingRepository.GetAllAsync()).Select(b => new BillingDto
            {
                BillId = b.BillId,
                BillNo = b.BillNo,
                BillDate = b.BillDate,
                CustomerId = b.CustomerId,
                TotalAmount = b.TotalAmount,
                Status = b.Status
            }).ToList();
            return Ok(bills);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> Get(int id)
        {
            var bill = await _billingRepository.GetByIdAsync(id);
            if (bill == null) return NotFound();
            return Ok(new BillingDto
            {
                BillId = bill.BillId,
                BillNo = bill.BillNo,
                BillDate = bill.BillDate,
                CustomerId = bill.CustomerId,
                TotalAmount = bill.TotalAmount,
                Status = bill.Status
            });
        }

        [HttpPost]
        public async Task<IActionResult> Create(BillingDto dto)
        {
            var bill = new Billing
            {
                BillNo = dto.BillNo,
                BillDate = dto.BillDate,
                CustomerId = dto.CustomerId,
                TotalAmount = dto.TotalAmount,
                Status = dto.Status
            };
            await _billingRepository.AddAsync(bill);
            dto.BillId = bill.BillId;
            return CreatedAtAction(nameof(Get), new { id = bill.BillId }, dto);
        }
    }
}