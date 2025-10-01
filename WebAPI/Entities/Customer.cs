namespace WebAPI.Entities
{
    public class Customer
    {
        public int CustomerId { get; set; }
        public string Name { get; set; }
        public string ContactNo { get; set; }
        public int DistributorId { get; set; }
        public Distributor Distributor { get; set; }
        public int AddressId { get; set; }
        public Address Address { get; set; }
        public bool Inactive { get; set; }
        public ICollection<Order> Orders { get; set; }
    }
}