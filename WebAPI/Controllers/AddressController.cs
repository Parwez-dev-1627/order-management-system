using Microsoft.AspNetCore.Mvc;
using WebAPI.Data;
using WebAPI.Entities;
using WebAPI.DTOs;

namespace WebAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AddressController : ControllerBase
    {
        private readonly WebAPI.Repositories.IAddressRepository _addressRepository;
        public AddressController(WebAPI.Repositories.IAddressRepository addressRepository)
        {
            _addressRepository = addressRepository;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var addresses = (await _addressRepository.GetAllAsync()).Select(a => new AddressDto
            {
                AddressId = a.AddressId,
                AddressLine1 = a.AddressLine1,
                AddressLine2 = a.AddressLine2,
                Landmark = a.Landmark,
                CityId = a.CityId,
                AddressType = a.AddressType
            }).ToList();
            return Ok(addresses);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> Get(int id)
        {
            var address = await _addressRepository.GetByIdAsync(id);
            if (address == null) return NotFound();
            return Ok(new AddressDto
            {
                AddressId = address.AddressId,
                AddressLine1 = address.AddressLine1,
                AddressLine2 = address.AddressLine2,
                Landmark = address.Landmark,
                CityId = address.CityId,
                AddressType = address.AddressType
            });
        }

        [HttpPost]
        public async Task<IActionResult> Create(AddressDto dto)
        {
            var address = new Address
            {
                AddressLine1 = dto.AddressLine1,
                AddressLine2 = dto.AddressLine2,
                Landmark = dto.Landmark,
                CityId = dto.CityId,
                AddressType = dto.AddressType
            };
            await _addressRepository.AddAsync(address);
            dto.AddressId = address.AddressId;
            return CreatedAtAction(nameof(Get), new { id = address.AddressId }, dto);
        }
    }
}