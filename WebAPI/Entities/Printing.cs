namespace WebAPI.Entities
{
    public class Printing
    {
        public int PrintingId { get; set; }
        public int OrderItemId { get; set; }
        public OrderItem OrderItem { get; set; }
        public DateTime PrintingDate { get; set; }
        public int PrintingQty { get; set; }
        public string Status { get; set; }
        public ICollection<Production> Productions { get; set; }
    }
}