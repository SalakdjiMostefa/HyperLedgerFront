import {Component, OnInit} from '@angular/core';
import {NavbarService} from "../../service/navbar.service";
import {Item} from "../../model/item";
import {CartService} from "../../service/cart.service";

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {
  nbrItem: number = 0;
  itemListSession: Item[] = [];
  itemListSessions: Item[] = [];

  constructor(private navbarService: NavbarService, private cartService: CartService) {
  }

  ngOnInit(): void {
  }

  getStatus(): boolean {
    return this.navbarService.isAuth;
  }

  signOut() {
    this.navbarService.signOut();
  }

  isCartEmpty(): boolean {
    this.itemListSessions = JSON.parse(JSON.stringify(sessionStorage.getItem('cart')));
    if (this.itemListSessions == null || "[]" === this.itemListSessions.toString()) {
      return false;
    } else {
      return true;
    }
  }
}
