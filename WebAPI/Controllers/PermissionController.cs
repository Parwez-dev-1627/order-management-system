using Microsoft.AspNetCore.Mvc;
using WebAPI.Data;
using WebAPI.Entities;
using WebAPI.DTOs;

namespace WebAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class PermissionController : ControllerBase
    {
        private readonly WebAPI.Repositories.IPermissionRepository _permissionRepository;
        public PermissionController(WebAPI.Repositories.IPermissionRepository permissionRepository)
        {
            _permissionRepository = permissionRepository;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var permissions = (await _permissionRepository.GetAllAsync()).Select(p => new PermissionDto
            {
                PermissionId = p.PermissionId,
                PermissionName = p.PermissionName,
                Module = p.Module,
                Action = p.Action
            }).ToList();
            return Ok(permissions);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> Get(int id)
        {
            var permission = await _permissionRepository.GetByIdAsync(id);
            if (permission == null) return NotFound();
            return Ok(new PermissionDto
            {
                PermissionId = permission.PermissionId,
                PermissionName = permission.PermissionName,
                Module = permission.Module,
                Action = permission.Action
            });
        }

        [HttpPost]
        public async Task<IActionResult> Create(PermissionDto dto)
        {
            var permission = new Permission
            {
                PermissionName = dto.PermissionName,
                Module = dto.Module,
                Action = dto.Action
            };
            await _permissionRepository.AddAsync(permission);
            dto.PermissionId = permission.PermissionId;
            return CreatedAtAction(nameof(Get), new { id = permission.PermissionId }, dto);
        }
    }
}