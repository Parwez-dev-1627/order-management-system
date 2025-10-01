namespace WebAPI.DTOs
{
    public class OrderDto
    {
        public int OrderId { get; set; }
        public DateTime PoDate { get; set; }
        public int DistributorId { get; set; }
        public int CustomerId { get; set; }
        public int EntryBy { get; set; }
        public DateTime? CreatedAt { get; set; }
        public string? Shop { get; set; }
        public string? PoNo { get; set; }
        public string? TallyPoNo { get; set; }
        public string? Remark { get; set; }
        public string? Status { get; set; }
    }
}