import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ProductComponent} from "./component/product/product.component";
import {ProductViewComponent} from "./component/product-view/product-view.component";
import {CartComponent} from "./component/cart/cart.component";
import {ForOhFourComponent} from "./component/for-oh-four/for-oh-four.component";
import {ConnectionComponent} from "./component/connection/connection.component";
import {ShippingComponent} from "./component/shipping/shipping.component";
import {PaymentComponent} from "./component/payment/payment.component";
import {UserAreaComponent} from "./component/user-area/user-area.component";
import {LedgerComponent} from "./component/ledger/ledger.component";

const routes: Routes = [
  {path: '', component: ProductViewComponent},
  {path: 'cart', component: CartComponent},
  {path: 'product', component: ProductViewComponent},
  {path: 'product/id', component: ProductComponent},
  {path: 'connection', component: ConnectionComponent},
  {path: 'userArea', component: UserAreaComponent},
  {path: 'ledger', component: LedgerComponent},
  {path: 'shipping', component: ShippingComponent},
  {path: 'payment', component: PaymentComponent},
  {path: 'not-found', component: ForOhFourComponent},
  {path: '**', redirectTo: '/not-found'},
  // {path: 'auth', component: AuthComponent},
  // {path: 'users', canActivate: [AutGuard], component: UserListComponent},
  // {path: 'edit', canActivate: [AutGuard], component: EditAppareilComponent},
  // {path: 'new-user', canActivate: [AutGuard], component: NewUserComponent},
  // {path: 'apareil', canActivate: [AutGuard] , component: AppareilViewComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule {
}
