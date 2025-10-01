using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace WebAPI.Migrations
{
    public partial class AddItemMasterIdAndBillingId : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_BillItems_Billings_BillingBillId",
                table: "BillItems");

            migrationBuilder.DropForeignKey(
                name: "FK_OrderItems_ItemMasters_ItemMasterItemId",
                table: "OrderItems");

            migrationBuilder.DropIndex(
                name: "IX_OrderItems_ItemMasterItemId",
                table: "OrderItems");

            migrationBuilder.DropColumn(
                name: "BillId",
                table: "BillItems");

            migrationBuilder.RenameColumn(
                name: "ItemMasterItemId",
                table: "OrderItems",
                newName: "Quantity");

            migrationBuilder.RenameColumn(
                name: "ItemId",
                table: "OrderItems",
                newName: "ItemMasterId");

            migrationBuilder.RenameColumn(
                name: "BillingBillId",
                table: "BillItems",
                newName: "BillingId");

            migrationBuilder.RenameIndex(
                name: "IX_BillItems_BillingBillId",
                table: "BillItems",
                newName: "IX_BillItems_BillingId");

            migrationBuilder.AddColumn<decimal>(
                name: "Rate",
                table: "OrderItems",
                type: "numeric",
                nullable: false,
                defaultValue: 0m);

            migrationBuilder.CreateIndex(
                name: "IX_OrderItems_ItemMasterId",
                table: "OrderItems",
                column: "ItemMasterId");

            migrationBuilder.AddForeignKey(
                name: "FK_BillItems_Billings_BillingId",
                table: "BillItems",
                column: "BillingId",
                principalTable: "Billings",
                principalColumn: "BillId",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_OrderItems_ItemMasters_ItemMasterId",
                table: "OrderItems",
                column: "ItemMasterId",
                principalTable: "ItemMasters",
                principalColumn: "ItemId",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_BillItems_Billings_BillingId",
                table: "BillItems");

            migrationBuilder.DropForeignKey(
                name: "FK_OrderItems_ItemMasters_ItemMasterId",
                table: "OrderItems");

            migrationBuilder.DropIndex(
                name: "IX_OrderItems_ItemMasterId",
                table: "OrderItems");

            migrationBuilder.DropColumn(
                name: "Rate",
                table: "OrderItems");

            migrationBuilder.RenameColumn(
                name: "Quantity",
                table: "OrderItems",
                newName: "ItemMasterItemId");

            migrationBuilder.RenameColumn(
                name: "ItemMasterId",
                table: "OrderItems",
                newName: "ItemId");

            migrationBuilder.RenameColumn(
                name: "BillingId",
                table: "BillItems",
                newName: "BillingBillId");

            migrationBuilder.RenameIndex(
                name: "IX_BillItems_BillingId",
                table: "BillItems",
                newName: "IX_BillItems_BillingBillId");

            migrationBuilder.AddColumn<int>(
                name: "BillId",
                table: "BillItems",
                type: "integer",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_OrderItems_ItemMasterItemId",
                table: "OrderItems",
                column: "ItemMasterItemId");

            migrationBuilder.AddForeignKey(
                name: "FK_BillItems_Billings_BillingBillId",
                table: "BillItems",
                column: "BillingBillId",
                principalTable: "Billings",
                principalColumn: "BillId",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_OrderItems_ItemMasters_ItemMasterItemId",
                table: "OrderItems",
                column: "ItemMasterItemId",
                principalTable: "ItemMasters",
                principalColumn: "ItemId",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
