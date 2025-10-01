namespace WebAPI.DTOs
{
    public class ProductionDto
    {
        public int ProductionId { get; set; }
        public int PrintingId { get; set; }
        public DateTime ProductionDate { get; set; }
        public int ProductionQty { get; set; }
        public string Status { get; set; }
    }
}