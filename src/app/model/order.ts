import {Address} from "./address";
 import {OrderLine} from "./order-line";

export interface Order {
  id: number;
  address: Address
  orderLines: OrderLine[];
  customerId: number;
}
