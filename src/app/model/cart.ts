import {Item} from "./item";
import {Address} from "./address";

export interface Cart {
  id: number;
  address: Address
  orderLines: Item[];
}
