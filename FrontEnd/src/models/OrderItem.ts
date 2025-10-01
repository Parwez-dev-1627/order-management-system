export interface OrderItem {
  orderItemId: number;
  orderId: number;
  itemMasterId: number;
  quantity: number;
  rate: number;
  pcPerBox: number;
  totalQty: number;
  pcPerSheet: number;
  noOfSheets: number;
}