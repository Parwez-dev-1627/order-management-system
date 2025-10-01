namespace WebAPI.Entities
{
    public class Dispatch
    {
        public int DispatchId { get; set; }
        public int OrderItemId { get; set; }
        public OrderItem OrderItem { get; set; }
        public DateTime DispatchDate { get; set; }
        public int DispatchQty { get; set; }
        public string Status { get; set; }
        public ICollection<BillItem> BillItems { get; set; }
    }
}