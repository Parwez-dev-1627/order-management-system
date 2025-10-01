namespace WebAPI.DTOs
{
    public class CustomerDto
    {
        public int CustomerId { get; set; }
        public string Name { get; set; }
        public string ContactNo { get; set; }
        public int DistributorId { get; set; }
        public int AddressId { get; set; }
        public bool Inactive { get; set; }
    }
}