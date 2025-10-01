import { OrderItem } from "./OrderItem";

export interface Order {
  orderId: number;
  shop: string;
  poNo: string;
  poDate: string;
  tallyPoNo: string;
  distributorId: number;
  customerId: number;
  entryBy: number;
  remark: string;
  createdAt: string;
  status: string;
  orderItems: OrderItem[];
}
