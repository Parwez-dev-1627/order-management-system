using Microsoft.AspNetCore.Mvc;
using WebAPI.Data;
using WebAPI.Entities;
using WebAPI.DTOs;

namespace WebAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class EmployeeController : ControllerBase
    {
        private readonly WebAPI.Repositories.IEmployeeRepository _employeeRepository;
        public EmployeeController(WebAPI.Repositories.IEmployeeRepository employeeRepository)
        {
            _employeeRepository = employeeRepository;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var employees = (await _employeeRepository.GetAllAsync()).Select(e => new EmployeeDto
            {
                EmployeeId = e.EmployeeId,
                EmpCode = e.EmpCode,
                Name = e.Name,
                Username = e.Username,
                RoleId = e.RoleId,
                AddressId = e.AddressId,
                Inactive = e.Inactive
            }).ToList();
            return Ok(employees);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> Get(int id)
        {
            var employee = await _employeeRepository.GetByIdAsync(id);
            if (employee == null) return NotFound();
            return Ok(new EmployeeDto
            {
                EmployeeId = employee.EmployeeId,
                EmpCode = employee.EmpCode,
                Name = employee.Name,
                Username = employee.Username,
                RoleId = employee.RoleId,
                AddressId = employee.AddressId,
                Inactive = employee.Inactive
            });
        }

        [HttpPost]
        public async Task<IActionResult> Create(EmployeeDto dto)
        {
            var employee = new Employee
            {
                EmpCode = dto.EmpCode,
                Name = dto.Name,
                Username = dto.Username,
                RoleId = dto.RoleId,
                AddressId = dto.AddressId,
                Inactive = dto.Inactive
            };
            await _employeeRepository.AddAsync(employee);
            dto.EmployeeId = employee.EmployeeId;
            return CreatedAtAction(nameof(Get), new { id = employee.EmployeeId }, dto);
        }
    }
}