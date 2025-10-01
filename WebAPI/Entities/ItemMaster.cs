namespace WebAPI.Entities
{
    public class ItemMaster
    {
    [System.ComponentModel.DataAnnotations.Key]
    public int ItemId { get; set; }
        public string ItemCode { get; set; }
        public string ItemName { get; set; }
        public string PrintType { get; set; }
        public string Colour1 { get; set; }
        public string Colour2 { get; set; }
        public int PcPerBox { get; set; }
        public int PcPerSheet { get; set; }
        public int PaperGsm { get; set; }
    }
}