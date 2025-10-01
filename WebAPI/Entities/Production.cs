namespace WebAPI.Entities
{
    public class Production
    {
        public int ProductionId { get; set; }
        public int PrintingId { get; set; }
        public Printing Printing { get; set; }
        public DateTime ProductionDate { get; set; }
        public int ProductionQty { get; set; }
        public string Status { get; set; }
    }
}