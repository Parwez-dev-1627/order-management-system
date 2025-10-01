using Microsoft.AspNetCore.Mvc;
using WebAPI.Data;
using WebAPI.Entities;
using WebAPI.DTOs;

namespace WebAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CustomerController : ControllerBase
    {
        private readonly WebAPI.Repositories.ICustomerRepository _customerRepository;
        public CustomerController(WebAPI.Repositories.ICustomerRepository customerRepository)
        {
            _customerRepository = customerRepository;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var customers = (await _customerRepository.GetAllAsync()).Select(c => new CustomerDto
            {
                CustomerId = c.CustomerId,
                Name = c.Name,
                ContactNo = c.ContactNo,
                DistributorId = c.DistributorId,
                AddressId = c.AddressId,
                Inactive = c.Inactive
            }).ToList();
            return Ok(customers);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> Get(int id)
        {
            var customer = await _customerRepository.GetByIdAsync(id);
            if (customer == null) return NotFound();
            return Ok(new CustomerDto
            {
                CustomerId = customer.CustomerId,
                Name = customer.Name,
                ContactNo = customer.ContactNo,
                DistributorId = customer.DistributorId,
                AddressId = customer.AddressId,
                Inactive = customer.Inactive
            });
        }

        [HttpPost]
        public async Task<IActionResult> Create(CustomerDto dto)
        {
            var customer = new Customer
            {
                Name = dto.Name,
                ContactNo = dto.ContactNo,
                DistributorId = dto.DistributorId,
                AddressId = dto.AddressId,
                Inactive = dto.Inactive
            };
            await _customerRepository.AddAsync(customer);
            dto.CustomerId = customer.CustomerId;
            return CreatedAtAction(nameof(Get), new { id = customer.CustomerId }, dto);
        }
    }
}