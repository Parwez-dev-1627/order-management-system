namespace WebAPI.DTOs
{
    public class EmployeeDto
    {
        public int EmployeeId { get; set; }
        public string EmpCode { get; set; }
        public string Name { get; set; }
        public string Username { get; set; }
        public int RoleId { get; set; }
        public int AddressId { get; set; }
        public bool Inactive { get; set; }
    }
}