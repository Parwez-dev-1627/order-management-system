using Microsoft.AspNetCore.Mvc;
using WebAPI.Data;
using WebAPI.Entities;
using WebAPI.DTOs;

namespace WebAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ItemMasterController : ControllerBase
    {
        private readonly WebAPI.Repositories.IItemMasterRepository _itemMasterRepository;
        public ItemMasterController(WebAPI.Repositories.IItemMasterRepository itemMasterRepository)
        {
            _itemMasterRepository = itemMasterRepository;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var items = (await _itemMasterRepository.GetAllAsync()).Select(i => new ItemMasterDto
            {
                ItemId = i.ItemId,
                ItemCode = i.ItemCode,
                ItemName = i.ItemName,
                PrintType = i.PrintType,
                Colour1 = i.Colour1,
                Colour2 = i.Colour2,
                PcPerBox = i.PcPerBox,
                PcPerSheet = i.PcPerSheet,
                PaperGsm = i.PaperGsm
            }).ToList();
            return Ok(items);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> Get(int id)
        {
            var item = await _itemMasterRepository.GetByIdAsync(id);
            if (item == null) return NotFound();
            return Ok(new ItemMasterDto
            {
                ItemId = item.ItemId,
                ItemCode = item.ItemCode,
                ItemName = item.ItemName,
                PrintType = item.PrintType,
                Colour1 = item.Colour1,
                Colour2 = item.Colour2,
                PcPerBox = item.PcPerBox,
                PcPerSheet = item.PcPerSheet,
                PaperGsm = item.PaperGsm
            });
        }

        [HttpPost]
        public async Task<IActionResult> Create(ItemMasterDto dto)
        {
            var item = new ItemMaster
            {
                ItemCode = dto.ItemCode,
                ItemName = dto.ItemName,
                PrintType = dto.PrintType,
                Colour1 = dto.Colour1,
                Colour2 = dto.Colour2,
                PcPerBox = dto.PcPerBox,
                PcPerSheet = dto.PcPerSheet,
                PaperGsm = dto.PaperGsm
            };
            await _itemMasterRepository.AddAsync(item);
            dto.ItemId = item.ItemId;
            return CreatedAtAction(nameof(Get), new { id = item.ItemId }, dto);
        }
    }
}