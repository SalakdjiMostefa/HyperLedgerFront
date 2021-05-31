import { Injectable } from '@angular/core';
import {Cart} from "../model/cart";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  apiUrl = 'http://localhost:8080/order';

  constructor(private httpClient: HttpClient) { }

  placeOrder(cart: Cart) {
    this.httpClient.post(this.apiUrl.concat("/createOrder"), cart).subscribe(
      (val) => {
        console.log("POST call successful value returned in body",
          val);
      },
      response => {
        console.log("POST call in error", response);
      },
      () => {
        console.log("The POST observable is now completed.");
      });

    console.log(cart)
  }
}
