import {Component, Input, OnInit} from '@angular/core';
import {ProductService} from "../../service/product.service";
import {ActivatedRoute} from "@angular/router";
import {Item} from "../../model/item";
import {CartService} from "../../service/cart.service";

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {

  // @Input() id!: string;
  // @Input() name!: string;
  // @Input() unitCost !: number;
  // @Input() imagePath !: string;
  id: any;
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
  @Input() qty: number | string = 1;

  constructor(private productService: ProductService, private router: ActivatedRoute, private cartService: CartService) {
  }

  ngOnInit(): void {
    this.router.params.subscribe(params => {
      this.id = params['id'];
    });
    this.getProduct(this.id);
  }

  getProduct(id: any) {

    this.productService.getProductFromServer(id).subscribe(
      res => {
        let item: Item;
        // @ts-ignore
        this.item = <Item>JSON.parse(res);

      }
    );
  }

  addToCart(item: Item) {
    this.cartService.addToCart(item, this.qty)
  }
}
