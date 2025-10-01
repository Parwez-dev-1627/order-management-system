namespace WebAPI.DTOs
{
    public class BillItemDto
    {
    public int BillItemId { get; set; }
    public int BillingId { get; set; }
    public int DispatchId { get; set; }
    public int Quantity { get; set; }
    public decimal Rate { get; set; }
    public decimal Amount { get; set; }
    }
}