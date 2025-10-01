using Microsoft.AspNetCore.Mvc;
using WebAPI.Data;
using WebAPI.Entities;
using WebAPI.DTOs;

namespace WebAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CityController : ControllerBase
    {
        private readonly WebAPI.Repositories.ICityRepository _cityRepository;
        public CityController(WebAPI.Repositories.ICityRepository cityRepository)
        {
            _cityRepository = cityRepository;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var cities = (await _cityRepository.GetAllAsync()).Select(c => new CityDto
            {
                CityId = c.CityId,
                CityName = c.CityName,
                Pincode = c.Pincode,
                StateId = c.StateId
            }).ToList();
            return Ok(cities);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> Get(int id)
        {
            var city = await _cityRepository.GetByIdAsync(id);
            if (city == null) return NotFound();
            return Ok(new CityDto
            {
                CityId = city.CityId,
                CityName = city.CityName,
                Pincode = city.Pincode,
                StateId = city.StateId
            });
        }

        [HttpPost]
        public async Task<IActionResult> Create(CityDto dto)
        {
            var city = new City
            {
                CityName = dto.CityName,
                Pincode = dto.Pincode,
                StateId = dto.StateId
            };
            await _cityRepository.AddAsync(city);
            dto.CityId = city.CityId;
            return CreatedAtAction(nameof(Get), new { id = city.CityId }, dto);
        }
    }
}