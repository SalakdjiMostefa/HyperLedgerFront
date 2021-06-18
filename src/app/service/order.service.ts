import {Injectable} from '@angular/core';
import {Cart} from "../model/cart";
import {HttpClient} from "@angular/common/http";
import {Order} from "../model/order";

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  apiUrl = 'http://localhost:8080/order';
  orders : Order[] | undefined;
  constructor(private httpClient: HttpClient) {
  }

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

    // this.httpClient.post("http://localhost:8080/hypfab/createOrder", cart).subscribe(
    //   (val) => {
    //     console.log("POST call successful value returned in body",
    //       val);
    //   },
    //   response => {
    //     console.log("POST call in error", response);
    //   },
    //   () => {
    //     console.log("The POST observable is now completed.");
    //   });
  }

  getAllOrdersByClientMail(email: string | null) : Order[] | undefined {
    // @ts-ignore
    this.httpClient.get(this.apiUrl.concat("/getOrdersByClient/".concat(email))).subscribe(
      // @ts-ignore
      (val : Order[]) => {
        console.log("POST call successful value returned in body",
          this.orders = val);
      },
      response => {
        console.log("POST call in error", response);
      },
      () => {
        console.log("The POST observable is now completed.");
      }
    );
    return this.orders;
  }

  getOrderFromLedger() {
    this.httpClient.get("http://localhost:8080/hypfab/getAllOrders").subscribe(
      // @ts-ignore
      (val : Order[]) => {
        console.log("POST call successful value returned in body",
          this.orders = val);
      },
      response => {
        console.log("POST call in error", response);
      },
      () => {
        console.log("The POST observable is now completed.");
      }
    );
    return this.orders;
  }
}
