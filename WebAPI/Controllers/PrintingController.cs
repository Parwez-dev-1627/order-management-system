using Microsoft.AspNetCore.Mvc;
using WebAPI.Data;
using WebAPI.Entities;
using WebAPI.DTOs;

namespace WebAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class PrintingController : ControllerBase
    {
        private readonly WebAPI.Repositories.IPrintingRepository _printingRepository;
        public PrintingController(WebAPI.Repositories.IPrintingRepository printingRepository)
        {
            _printingRepository = printingRepository;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var printings = (await _printingRepository.GetAllAsync()).Select(p => new PrintingDto
            {
                PrintingId = p.PrintingId,
                OrderItemId = p.OrderItemId,
                PrintingDate = p.PrintingDate,
                PrintingQty = p.PrintingQty,
                Status = p.Status
            }).ToList();
            return Ok(printings);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> Get(int id)
        {
            var printing = await _printingRepository.GetByIdAsync(id);
            if (printing == null) return NotFound();
            return Ok(new PrintingDto
            {
                PrintingId = printing.PrintingId,
                OrderItemId = printing.OrderItemId,
                PrintingDate = printing.PrintingDate,
                PrintingQty = printing.PrintingQty,
                Status = printing.Status
            });
        }

        [HttpPost]
        public async Task<IActionResult> Create(PrintingDto dto)
        {
            var printing = new Printing
            {
                OrderItemId = dto.OrderItemId,
                PrintingDate = dto.PrintingDate,
                PrintingQty = dto.PrintingQty,
                Status = dto.Status
            };
            await _printingRepository.AddAsync(printing);
            dto.PrintingId = printing.PrintingId;
            return CreatedAtAction(nameof(Get), new { id = printing.PrintingId }, dto);
        }
    }
}