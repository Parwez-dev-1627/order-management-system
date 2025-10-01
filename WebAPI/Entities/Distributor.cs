namespace WebAPI.Entities
{
    public class Distributor
    {
        public int DistributorId { get; set; }
        public string Name { get; set; }
        public string ContactNo { get; set; }
        public string Email { get; set; }
        public int AddressId { get; set; }
        public Address Address { get; set; }
        public bool Inactive { get; set; }
        public ICollection<Customer> Customers { get; set; }
    }
}