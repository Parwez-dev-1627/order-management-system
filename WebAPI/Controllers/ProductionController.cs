using Microsoft.AspNetCore.Mvc;
using WebAPI.Data;
using WebAPI.Entities;
using WebAPI.DTOs;

namespace WebAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ProductionController : ControllerBase
    {
        private readonly WebAPI.Repositories.IProductionRepository _productionRepository;
        public ProductionController(WebAPI.Repositories.IProductionRepository productionRepository)
        {
            _productionRepository = productionRepository;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var productions = (await _productionRepository.GetAllAsync()).Select(p => new ProductionDto
            {
                ProductionId = p.ProductionId,
                PrintingId = p.PrintingId,
                ProductionDate = p.ProductionDate,
                ProductionQty = p.ProductionQty,
                Status = p.Status
            }).ToList();
            return Ok(productions);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> Get(int id)
        {
            var production = await _productionRepository.GetByIdAsync(id);
            if (production == null) return NotFound();
            return Ok(new ProductionDto
            {
                ProductionId = production.ProductionId,
                PrintingId = production.PrintingId,
                ProductionDate = production.ProductionDate,
                ProductionQty = production.ProductionQty,
                Status = production.Status
            });
        }

        [HttpPost]
        public async Task<IActionResult> Create(ProductionDto dto)
        {
            var production = new Production
            {
                PrintingId = dto.PrintingId,
                ProductionDate = dto.ProductionDate,
                ProductionQty = dto.ProductionQty,
                Status = dto.Status
            };
            await _productionRepository.AddAsync(production);
            dto.ProductionId = production.ProductionId;
            return CreatedAtAction(nameof(Get), new { id = production.ProductionId }, dto);
        }
    }
}