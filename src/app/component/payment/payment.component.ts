import { Component, OnInit } from '@angular/core';
import {Cart} from "../../model/cart";
import {OrderService} from "../../service/order.service";

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent implements OnInit {
  cart!: Cart;
  constructor(private orderService: OrderService) { }

  ngOnInit(): void {
  }

  placeOrder() {
    // @ts-ignore
    this.cart = sessionStorage.getItem("cartId");
    this.orderService.placeOrder(this.cart);
  }
}
