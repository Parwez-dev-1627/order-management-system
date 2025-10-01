namespace WebAPI.DTOs
{
    public class DispatchDto
    {
        public int DispatchId { get; set; }
        public int OrderItemId { get; set; }
        public DateTime DispatchDate { get; set; }
        public int DispatchQty { get; set; }
        public string Status { get; set; }
    }
}