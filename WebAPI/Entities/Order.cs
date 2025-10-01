namespace WebAPI.Entities
{
    public class Order
    {
        public int OrderId { get; set; }
        public DateTime PoDate { get; set; }
        public int DistributorId { get; set; }
        public int CustomerId { get; set; }
        public int EntryBy { get; set; }
        public DateTime CreatedAt { get; set; }
        public string? Shop { get; set; }
        public string? PoNo { get; set; }
        public string? TallyPoNo { get; set; }
        public Distributor? Distributor { get; set; }
        public Customer? Customer { get; set; }
        public string? Remark { get; set; }
        public string? Status { get; set; }
        public ICollection<OrderItem>? OrderItems { get; set; }
    }
}