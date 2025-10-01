namespace WebAPI.Entities
{
    public class OrderItem
    {
    public int OrderItemId { get; set; }
    public int OrderId { get; set; }
    public Order Order { get; set; }
    public int ItemMasterId { get; set; }
    public ItemMaster ItemMaster { get; set; }
    public int Quantity { get; set; }
    public decimal Rate { get; set; }
    public int PcPerBox { get; set; }
    public int TotalQty { get; set; }
    public int PcPerSheet { get; set; }
    public int NoOfSheets { get; set; }
    public ICollection<Printing> Printings { get; set; }
    }
}