namespace WebAPI.Entities
{
    public class Employee
    {
        public int EmployeeId { get; set; }
        public string EmpCode { get; set; }
        public string Name { get; set; }
        public string Username { get; set; }
        public string Password { get; set; }
        public int RoleId { get; set; }
        public Role Role { get; set; }
        public int AddressId { get; set; }
        public Address Address { get; set; }
        public bool Inactive { get; set; }
    }
}