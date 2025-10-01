using Microsoft.AspNetCore.Mvc;
using WebAPI.Data;
using WebAPI.Entities;
using WebAPI.DTOs;

namespace WebAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class RoleController : ControllerBase
    {
        private readonly WebAPI.Repositories.IRoleRepository _roleRepository;
        public RoleController(WebAPI.Repositories.IRoleRepository roleRepository)
        {
            _roleRepository = roleRepository;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var roles = (await _roleRepository.GetAllAsync()).Select(r => new RoleDto
            {
                RoleId = r.RoleId,
                RoleName = r.RoleName,
                Description = r.Description,
                Inactive = r.Inactive
            }).ToList();
            return Ok(roles);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> Get(int id)
        {
            var role = await _roleRepository.GetByIdAsync(id);
            if (role == null) return NotFound();
            return Ok(new RoleDto
            {
                RoleId = role.RoleId,
                RoleName = role.RoleName,
                Description = role.Description,
                Inactive = role.Inactive
            });
        }

        [HttpPost]
        public async Task<IActionResult> Create(RoleDto dto)
        {
            var role = new Role
            {
                RoleName = dto.RoleName,
                Description = dto.Description,
                Inactive = dto.Inactive
            };
            await _roleRepository.AddAsync(role);
            dto.RoleId = role.RoleId;
            return CreatedAtAction(nameof(Get), new { id = role.RoleId }, dto);
        }
    }
}