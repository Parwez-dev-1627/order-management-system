namespace WebAPI.DTOs
{
    public class OrderItemDto
    {
    public int OrderItemId { get; set; }
    public int OrderId { get; set; }
    public int ItemMasterId { get; set; }
    public int Quantity { get; set; }
    public decimal Rate { get; set; }
    public int PcPerBox { get; set; }
    public int TotalQty { get; set; }
    public int PcPerSheet { get; set; }
    public int NoOfSheets { get; set; }
    }
}