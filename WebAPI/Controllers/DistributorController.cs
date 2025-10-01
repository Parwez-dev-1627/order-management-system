using Microsoft.AspNetCore.Mvc;
using WebAPI.Data;
using WebAPI.Entities;
using WebAPI.DTOs;

namespace WebAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class DistributorController : ControllerBase
    {
        private readonly WebAPI.Repositories.IDistributorRepository _distributorRepository;
        public DistributorController(WebAPI.Repositories.IDistributorRepository distributorRepository)
        {
            _distributorRepository = distributorRepository;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var distributors = (await _distributorRepository.GetAllAsync()).Select(d => new DistributorDto
            {
                DistributorId = d.DistributorId,
                Name = d.Name,
                ContactNo = d.ContactNo,
                Email = d.Email,
                AddressId = d.AddressId,
                Inactive = d.Inactive
            }).ToList();
            return Ok(distributors);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> Get(int id)
        {
            var distributor = await _distributorRepository.GetByIdAsync(id);
            if (distributor == null) return NotFound();
            return Ok(new DistributorDto
            {
                DistributorId = distributor.DistributorId,
                Name = distributor.Name,
                ContactNo = distributor.ContactNo,
                Email = distributor.Email,
                AddressId = distributor.AddressId,
                Inactive = distributor.Inactive
            });
        }

        [HttpPost]
        public async Task<IActionResult> Create(DistributorDto dto)
        {
            var distributor = new Distributor
            {
                Name = dto.Name,
                ContactNo = dto.ContactNo,
                Email = dto.Email,
                AddressId = dto.AddressId,
                Inactive = dto.Inactive
            };
            await _distributorRepository.AddAsync(distributor);
            dto.DistributorId = distributor.DistributorId;
            return CreatedAtAction(nameof(Get), new { id = distributor.DistributorId }, dto);
        }
    }
}