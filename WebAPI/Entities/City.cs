namespace WebAPI.Entities
{
    public class City
    {
        public int CityId { get; set; }
        public string CityName { get; set; }
        public string Pincode { get; set; }
        public int StateId { get; set; }
        public State State { get; set; }
        public ICollection<Address> Addresses { get; set; }
    }
}