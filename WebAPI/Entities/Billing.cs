namespace WebAPI.Entities
{
    public class Billing
    {
    [System.ComponentModel.DataAnnotations.Key]
    public int BillId { get; set; }
        public string BillNo { get; set; }
        public DateTime BillDate { get; set; }
        public int CustomerId { get; set; }
        public Customer Customer { get; set; }
        public decimal TotalAmount { get; set; }
        public string Status { get; set; }
        public ICollection<BillItem> BillItems { get; set; }
    }
}