import {Component, OnInit} from '@angular/core';
import {OrderService} from "../../service/order.service";
import {Order} from "../../model/order";

@Component({
  selector: 'app-user-area',
  templateUrl: './user-area.component.html',
  styleUrls: ['./user-area.component.scss']
})
export class UserAreaComponent implements OnInit {

  orders: Order[] | undefined;

  constructor(private orderService: OrderService) {
  }

  ngOnInit(): void {
    let email = sessionStorage.getItem("email");
    this.getOrdersByEmailClient(email);
  }

  private getOrdersByEmailClient(email: string | null) {
    this.orders = this.orderService.getAllOrdersByClientMail(email);
    console.log(this.orders)

  }
}
