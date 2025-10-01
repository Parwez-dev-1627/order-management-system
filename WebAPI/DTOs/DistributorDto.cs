namespace WebAPI.DTOs
{
    public class DistributorDto
    {
        public int DistributorId { get; set; }
        public string Name { get; set; }
        public string ContactNo { get; set; }
        public string Email { get; set; }
        public int AddressId { get; set; }
        public bool Inactive { get; set; }
    }
}