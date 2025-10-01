using Microsoft.AspNetCore.Mvc;
using WebAPI.Data;
using WebAPI.Entities;
using WebAPI.DTOs;

namespace WebAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CountryController : ControllerBase
    {
        private readonly WebAPI.Repositories.ICountryRepository _countryRepository;
        public CountryController(WebAPI.Repositories.ICountryRepository countryRepository)
        {
            _countryRepository = countryRepository;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var countries = (await _countryRepository.GetAllAsync()).Select(c => new CountryDto
            {
                CountryId = c.CountryId,
                CountryName = c.CountryName,
                CountryCode = c.CountryCode
            }).ToList();
            return Ok(countries);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> Get(int id)
        {
            var country = await _countryRepository.GetByIdAsync(id);
            if (country == null) return NotFound();
            return Ok(new CountryDto
            {
                CountryId = country.CountryId,
                CountryName = country.CountryName,
                CountryCode = country.CountryCode
            });
        }

        [HttpPost]
        public async Task<IActionResult> Create(CountryDto dto)
        {
            var country = new Country
            {
                CountryName = dto.CountryName,
                CountryCode = dto.CountryCode
            };
            await _countryRepository.AddAsync(country);
            dto.CountryId = country.CountryId;
            return CreatedAtAction(nameof(Get), new { id = country.CountryId }, dto);
        }
    }
}