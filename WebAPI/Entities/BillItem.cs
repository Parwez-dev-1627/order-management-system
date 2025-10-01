namespace WebAPI.Entities
{
    public class BillItem
    {
    public int BillItemId { get; set; }
    public int BillingId { get; set; }
    public Billing Billing { get; set; }
    public int DispatchId { get; set; }
    public Dispatch Dispatch { get; set; }
    public int Quantity { get; set; }
    public decimal Rate { get; set; }
    public decimal Amount { get; set; }
    }
}