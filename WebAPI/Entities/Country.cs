namespace WebAPI.Entities
{
    public class Country
    {
        public int CountryId { get; set; }
        public string CountryName { get; set; }
        public string CountryCode { get; set; }
        public ICollection<State> States { get; set; }
    }
}