namespace WebAPI.DTOs
{
    public class PrintingDto
    {
        public int PrintingId { get; set; }
        public int OrderItemId { get; set; }
        public DateTime PrintingDate { get; set; }
        public int PrintingQty { get; set; }
        public string Status { get; set; }
    }
}