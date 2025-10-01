using Microsoft.AspNetCore.Mvc;
using WebAPI.Data;
using WebAPI.Entities;
using WebAPI.DTOs;

namespace WebAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class StateController : ControllerBase
    {
        private readonly WebAPI.Repositories.IStateRepository _stateRepository;
        public StateController(WebAPI.Repositories.IStateRepository stateRepository)
        {
            _stateRepository = stateRepository;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var states = (await _stateRepository.GetAllAsync()).Select(s => new StateDto
            {
                StateId = s.StateId,
                StateName = s.StateName,
                StateCode = s.StateCode,
                CountryId = s.CountryId
            }).ToList();
            return Ok(states);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> Get(int id)
        {
            var state = await _stateRepository.GetByIdAsync(id);
            if (state == null) return NotFound();
            return Ok(new StateDto
            {
                StateId = state.StateId,
                StateName = state.StateName,
                StateCode = state.StateCode,
                CountryId = state.CountryId
            });
        }

        [HttpPost]
        public async Task<IActionResult> Create(StateDto dto)
        {
            var state = new State
            {
                StateName = dto.StateName,
                StateCode = dto.StateCode,
                CountryId = dto.CountryId
            };
            await _stateRepository.AddAsync(state);
            dto.StateId = state.StateId;
            return CreatedAtAction(nameof(Get), new { id = state.StateId }, dto);
        }
    }
}