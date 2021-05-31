import {Component, Input, OnInit} from '@angular/core';
import {ProductService} from "../../service/product.service";
import {Item} from "../../model/item";
import {Router} from "@angular/router";
import {CartService} from "../../service/cart.service";
import {NavbarService} from "../../service/navbar.service";

@Component({
  selector: 'app-product-view',
  templateUrl: './product-view.component.html',
  styleUrls: ['./product-view.component.scss']
})

export class ProductViewComponent implements OnInit {
  @Input() qty: number | string = 1;
  // @ts-ignore
  item: Item = {
    stock: 0,
    imagePath: "",
    name: "",
    productDescription: "",
    productId: 0,
    productName: "",
    unitCost: 0,
    qty: 0
  };
  itemList: Item[] = [];
  itemListSession: Item[] = [];
  itemListSessions: Item[] = [];
  totalCart!: number;


  constructor(private productService: ProductService, private route: Router, private cartService: CartService,
              private navBarService: NavbarService) {
  }

  ngOnInit(): void {
    this.getAllProducts();
    // this.itemListSession.push(this.item);

    // @ts-ignore
    sessionStorage.setItem("cart", JSON.stringify(this.itemListSession));
    // sessionStorage.setItem("totalCart", JSON.stringify(this.totalCart));
  }

  getAllProducts() {
    this.productService.getAllProductsFromServer()
      .subscribe(
        // @ts-ignore
        (res: Array<Item>) => {
          // @ts-ignore
          for (let resKey of JSON.parse(res)) {
            let item: Item;
            item = <Item>resKey;
            this.itemList.push(item)
          }
        }
      );
  }

  addToCart(item: Item) {
    this.cartService.addToCart(item, this.qty);
  }

}
