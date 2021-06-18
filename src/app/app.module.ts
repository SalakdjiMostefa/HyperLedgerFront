import {NgModule, NO_ERRORS_SCHEMA,CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {ProductComponent} from './component/product/product.component';
import {ProductViewComponent} from './component/product-view/product-view.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import {RouterModule} from "@angular/router";
import {ProductService} from "./service/product.service";
import {NavBarComponent} from './component/nav-bar/nav-bar.component';
import {CartComponent} from './component/cart/cart.component';
import {LivraisonComponent} from './component/livraison/livraison.component';
import {ConnectionComponent} from './component/connection/connection.component';
import {ShippingComponent} from './component/shipping/shipping.component';
import {UserService} from "./service/user.service";
import {CartService} from "./service/cart.service";
import {NavbarService} from "./service/navbar.service";
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import { PaymentComponent } from './component/payment/payment.component';
import { UserAreaComponent } from './component/user-area/user-area.component';
import { LedgerComponent } from './component/ledger/ledger.component';
@NgModule({
  declarations: [
    AppComponent,
    ProductComponent,
    ProductViewComponent,
    NavBarComponent,
    CartComponent,
    LivraisonComponent,
    ConnectionComponent,
    ShippingComponent,
    PaymentComponent,
    UserAreaComponent,
    LedgerComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule,
    FontAwesomeModule,
  ],
  providers: [
    ProductService,
    UserService,
    CartService,
    NavbarService,
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA,
    NO_ERRORS_SCHEMA
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
}
