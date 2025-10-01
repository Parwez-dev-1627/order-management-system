namespace WebAPI.Entities
{
    public class Permission
    {
        public int PermissionId { get; set; }
        public string PermissionName { get; set; }
        public string Module { get; set; }
        public string Action { get; set; }
        public ICollection<RolePermission> RolePermissions { get; set; }
    }
}