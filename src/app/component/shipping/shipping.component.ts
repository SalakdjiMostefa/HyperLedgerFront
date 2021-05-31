import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Address} from "../../model/address";
import {CartService} from "../../service/cart.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-shipping',
  templateUrl: './shipping.component.html',
  styleUrls: ['./shipping.component.scss']
})
export class ShippingComponent implements OnInit {
  shippingAddressForm!: FormGroup;

  constructor(private formBuilder: FormBuilder,
              private router: Router,
              private cartService: CartService) {
  }

  ngOnInit(): void {
    this.initUserForm();
  }


  onSubmitShippingAddressForm() {
    const formValue = this.shippingAddressForm.value;
    const shippingAddress = new Address(
      formValue['street1'],
      formValue['street2'],
      formValue['city'],
      formValue['state'],
      formValue['zipcode'],
    );
    this.cartService.setShippingAddressToCart(shippingAddress);
    this.router.navigate(['../payment'])
  }

  initUserForm() {
    this.shippingAddressForm = this.formBuilder.group({
      street1: ['', Validators.required],
      street2: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required],
      zipcode: ['', Validators.required],
    });
  }
}
