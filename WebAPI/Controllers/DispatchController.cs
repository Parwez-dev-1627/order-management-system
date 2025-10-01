using Microsoft.AspNetCore.Mvc;
using WebAPI.Data;
using WebAPI.Entities;
using WebAPI.DTOs;

namespace WebAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class DispatchController : ControllerBase
    {
        private readonly WebAPI.Repositories.IDispatchRepository _dispatchRepository;
        public DispatchController(WebAPI.Repositories.IDispatchRepository dispatchRepository)
        {
            _dispatchRepository = dispatchRepository;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var dispatches = (await _dispatchRepository.GetAllAsync()).Select(d => new DispatchDto
            {
                DispatchId = d.DispatchId,
                OrderItemId = d.OrderItemId,
                DispatchDate = d.DispatchDate,
                DispatchQty = d.DispatchQty,
                Status = d.Status
            }).ToList();
            return Ok(dispatches);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> Get(int id)
        {
            var dispatch = await _dispatchRepository.GetByIdAsync(id);
            if (dispatch == null) return NotFound();
            return Ok(new DispatchDto
            {
                DispatchId = dispatch.DispatchId,
                OrderItemId = dispatch.OrderItemId,
                DispatchDate = dispatch.DispatchDate,
                DispatchQty = dispatch.DispatchQty,
                Status = dispatch.Status
            });
        }

        [HttpPost]
        public async Task<IActionResult> Create(DispatchDto dto)
        {
            var dispatch = new Dispatch
            {
                OrderItemId = dto.OrderItemId,
                DispatchDate = dto.DispatchDate,
                DispatchQty = dto.DispatchQty,
                Status = dto.Status
            };
            await _dispatchRepository.AddAsync(dispatch);
            dto.DispatchId = dispatch.DispatchId;
            return CreatedAtAction(nameof(Get), new { id = dispatch.DispatchId }, dto);
        }
    }
}