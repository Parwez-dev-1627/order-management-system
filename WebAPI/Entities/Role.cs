namespace WebAPI.Entities
{
    public class Role
    {
        public int RoleId { get; set; }
        public string RoleName { get; set; }
        public string Description { get; set; }
        public bool Inactive { get; set; }
        public ICollection<Employee> Employees { get; set; }
        public ICollection<RolePermission> RolePermissions { get; set; }
    }
}