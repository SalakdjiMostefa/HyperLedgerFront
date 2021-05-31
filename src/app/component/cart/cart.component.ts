import {Component, OnInit} from '@angular/core';
import {Item} from "../../model/item";
import {ProductService} from "../../service/product.service";
import {Router} from "@angular/router";
import {CartService} from "../../service/cart.service";
import {NavbarService} from "../../service/navbar.service";
import {UserService} from "../../service/user.service";

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  totalCart: number = 0;
  itemCart: Item[] = [];
  itemCartUtil: Item[] = [];
  nbrItem: number = 0;


  constructor(private productService: ProductService,
              private router: Router, private cartService: CartService,
              private navBarService: NavbarService, private userService: UserService) {
  }

  ngOnInit(): void {
    this.getCartItems();
  }

  getCartItems() {
    this.itemCartUtil = JSON.parse(JSON.stringify(sessionStorage.getItem("cart")));
    // @ts-ignore
    for (const itemChild of JSON.parse(this.itemCartUtil)) {
      this.totalCart += +(<Item>itemChild).unitCost * (<Item>itemChild).qty;
      // (Math.round(this.totalCart*100)/100).toFixed(2);
      (this.totalCart).toFixed(2)
      this.itemCart.push(itemChild);
      this.nbrItem++;
    }
    this.navBarService.nbrItem = this.nbrItem;
  }

  isConnectedAndNotEmpty() {
    if (this.navBarService.isAuth) {
      if (this.totalCart != 0) {
        this.router.navigate(["../shipping"]);
      } else if (this.totalCart == 0) {
        this.router.navigate(["../product"]);
      }
    } else {
      this.router.navigate(["../connection"]);
    }
  }
}
