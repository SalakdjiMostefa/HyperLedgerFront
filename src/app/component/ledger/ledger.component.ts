import { Component, OnInit } from '@angular/core';
import {Order} from "../../model/order";
import {OrderService} from "../../service/order.service";

@Component({
  selector: 'app-ledger',
  templateUrl: './ledger.component.html',
  styleUrls: ['./ledger.component.scss']
})
export class LedgerComponent implements OnInit {
  orderList: Order[] | undefined = [];

  constructor(private orderService: OrderService) { }

  ngOnInit(): void {
    this.orderList = this.orderService.getOrderFromLedger();
    for (let orderListKey in this.orderList) {

    }
    console.log(this.orderList)
  }

}
