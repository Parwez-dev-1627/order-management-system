namespace WebAPI.DTOs
{
    public class AddressDto
    {
        public int AddressId { get; set; }
        public string AddressLine1 { get; set; }
        public string AddressLine2 { get; set; }
        public string Landmark { get; set; }
        public int CityId { get; set; }
        public string AddressType { get; set; }
    }
}