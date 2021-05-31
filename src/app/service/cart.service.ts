import {Injectable, Input} from '@angular/core';
import {Item} from "../model/item";
import {HttpClient} from "@angular/common/http";
import {NavbarService} from "./navbar.service";
import {UserConnect} from "../model/user-connect";
import {Cart} from "../model/cart";
import {Address} from "../model/address";

@Injectable({
  providedIn: 'root'
})
export class CartService {
  itemListSession: Item[] = [];
  itemListSessions: Item[] = [];
  isAuth: boolean = false;
  nbrItem: number = 0;
  cart: Cart = {id: 0, address: {street1: "", street2: "", city: "", state: "", zipcode: ""}, orderLines: []};

  @Input() qty: number | string = 1;
  apiUrl = 'http://localhost:8080/cart';

  constructor(private httpClient: HttpClient, private navBarService: NavbarService) {
  }


  addToCart(item: Item, qty: number | string) {
    this.itemListSessions = JSON.parse(JSON.stringify(sessionStorage.getItem('cart')));
    this.itemListSession = [];
    // @ts-ignore
    if (this.itemListSessions == null || "[]" === this.itemListSessions.toString()) {
      this.addItemToEmptyCart(item, qty);

      if (this.isAuth) {

      } else {
        this.createCartInBackToAnonymous().subscribe(res => {
          this.cart = <Cart>res;
          sessionStorage.setItem("cartId", JSON.stringify(res));
          console.log("res createCartInBackToAnonymous")
          console.log(res)
        })
      }

    } else {
      // @ts-ignore
      for (const itemChild of JSON.parse(this.itemListSessions)) {
        this.itemListSession.push(<Item>itemChild);
      }
      let exist = false;
      exist = this.addQtyToExistingItemIfExist(item, qty, exist);
      if (!exist) {
        item.qty += +qty;
        this.itemListSession.push(item);
      }
      this.initialiseSessionStorage();
    }
  }

  setIsAuthValue(isAuth: boolean) {
    this.isAuth = isAuth;
  }

  jointCartToUser(newUser: UserConnect) {

    // @ts-ignore
    this.cart = this.createCartInBackToSpecificUser(newUser);
    console.log("this.cart createCartInBackToSpecificUser")
    console.log(this.cart)
    sessionStorage.removeItem("cartId");
    sessionStorage.setItem("cartId", JSON.stringify(this.cart));

  }

  private addQtyToExistingItemIfExist(item: Item, qty: number | string, exist: boolean) {
    JSON.parse(JSON.stringify(this.itemListSession)).forEach((value: Item) => {
      if (value.id === item.id) {
        value.qty = +qty + +value.qty;
        let objIndex = this.itemListSession.findIndex((obj => obj.id == value.id));
        this.itemListSession[objIndex].qty = value.qty;
        exist = true;
      }
    });
    return exist;
  }

  private initialiseSessionStorage() {
    sessionStorage.removeItem("cart");
    sessionStorage.removeItem("totalCart");
    sessionStorage.setItem("cart", JSON.stringify(this.itemListSession));

    // sessionStorage.setItem("totalCart", JSON.stringify(this.totalCart));
    this.itemListSessions = [];
  }

  private addItemToEmptyCart(item: Item, qty: number | string) {
    // @ts-ignore
    item.qty = qty;
    this.itemListSession.push(item);
    sessionStorage.removeItem("cart");
    sessionStorage.setItem("cart", JSON.stringify(this.itemListSession));
    this.itemListSessions = [];
  }

  private createCartInBackToAnonymous() {
    return this.httpClient.post(this.apiUrl.concat("/createCartToAnonym"), this.itemListSession);
    // .subscribe(
    // (val) => {
    //   console.log("POST call successful value returned in body",
    //     val);
    //   this.cartSubscription = val;
    // },
    // response => {
    //   console.log("POST call in error", response);
    // },
    // () => {
    //   console.log("The POST observable is now completed.");
    // });

    // cart.subscribe(
    //   res => {
    //     if (typeof res === "string") {
    //       this.cart = <Cart>JSON.parse(res);
    //     }
    //   }
    // );
  }

  private createCartInBackToSpecificUser(newUser: UserConnect) {
    let email = sessionStorage.getItem("email");
    let cartId = sessionStorage.getItem("cartId");
    let data = {"email": email, "cart": cartId};

    // @ts-ignore
    this.cart = this.httpClient.post(this.apiUrl.concat("/joinCartToUser"), data).subscribe(
      (val) => {
        console.log("POST call successful value returned in body",
          val);
        sessionStorage.removeItem("cartId");
        sessionStorage.setItem("cartId", JSON.stringify(val));
      },
      response => {
        console.log("POST call in error", response);
      },
      () => {
        console.log("The POST observable is now completed.");
      });
    // console.log(cart)
  }

  setShippingAddressToCart(shippingAddress: Address) {
    let cartId = sessionStorage.getItem("cartId");
    let data = {"Address": JSON.stringify(shippingAddress), "cart": cartId};
    this.httpClient.post(this.apiUrl.concat("/setShippingAddressToCart"), data).subscribe(
      (val) => {
        console.log("POST call successful value returned in body",
          val);
        sessionStorage.removeItem("cartId");
        sessionStorage.setItem("cartId", JSON.stringify(val));
      },
      response => {
        console.log("POST call in error", response);
      },
      () => {
        console.log("The POST observable is now completed.");
      });
  }
}
