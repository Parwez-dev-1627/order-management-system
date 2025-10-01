using Microsoft.AspNetCore.Mvc;
using WebAPI.Data;
using WebAPI.Entities;
using WebAPI.DTOs;

namespace WebAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class RolePermissionController : ControllerBase
    {
        private readonly WebAPI.Repositories.IRolePermissionRepository _rolePermissionRepository;
        public RolePermissionController(WebAPI.Repositories.IRolePermissionRepository rolePermissionRepository)
        {
            _rolePermissionRepository = rolePermissionRepository;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var rolePermissions = (await _rolePermissionRepository.GetAllAsync()).Select(rp => new RolePermissionDto
            {
                Id = rp.Id,
                RoleId = rp.RoleId,
                PermissionId = rp.PermissionId
            }).ToList();
            return Ok(rolePermissions);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> Get(int id)
        {
            var rolePermission = await _rolePermissionRepository.GetByIdAsync(id);
            if (rolePermission == null) return NotFound();
            return Ok(new RolePermissionDto
            {
                Id = rolePermission.Id,
                RoleId = rolePermission.RoleId,
                PermissionId = rolePermission.PermissionId
            });
        }

        [HttpPost]
        public async Task<IActionResult> Create(RolePermissionDto dto)
        {
            var rolePermission = new RolePermission
            {
                RoleId = dto.RoleId,
                PermissionId = dto.PermissionId
            };
            await _rolePermissionRepository.AddAsync(rolePermission);
            dto.Id = rolePermission.Id;
            return CreatedAtAction(nameof(Get), new { id = rolePermission.Id }, dto);
        }
    }
}