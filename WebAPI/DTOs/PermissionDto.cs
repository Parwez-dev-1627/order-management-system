namespace WebAPI.DTOs
{
    public class PermissionDto
    {
        public int PermissionId { get; set; }
        public string PermissionName { get; set; }
        public string Module { get; set; }
        public string Action { get; set; }
    }
}