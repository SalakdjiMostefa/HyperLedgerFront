import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {UserService} from "../../service/user.service";
import {User} from "../../model/user";
import {UserConnect} from "../../model/user-connect";
import {NavbarService} from "../../service/navbar.service";
import {CartService} from "../../service/cart.service";
import {Item} from "../../model/item";
import {Router} from "@angular/router";

@Component({
  selector: 'app-connection',
  templateUrl: './connection.component.html',
  styleUrls: ['./connection.component.scss']
})
export class ConnectionComponent implements OnInit {
  createUserForm!: FormGroup;
  connectUserForm!: FormGroup;
  isAuth: boolean = false;
  itemListSession: Item[] = [];
  itemListSessions: Item[] = [];

  constructor(private userService: UserService,
              private formBuilder: FormBuilder,
              private navBarService: NavbarService,
              private cartService: CartService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.initUserForm();
    this.initConnectUserForm();
  }

  initConnectUserForm() {
    this.connectUserForm = this.formBuilder.group({
      emailCon: ['', [Validators.required, Validators.email]],
      passwordCon: ['', Validators.required],
    });
  }

  initUserForm() {
    this.createUserForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      street1: ['', Validators.required],
      street2: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required],
      zipcode: ['', Validators.required],
    });
  }

  onSubmitCreateForm() {
    const formValue = this.createUserForm.value;
    const newUser = new User(
      formValue['email'],
      formValue['password'],
      formValue['street1'],
      formValue['street2'],
      formValue['city'],
      formValue['state'],
      formValue['zipcode'],
    );
    this.userService.addUser(newUser);
    // this.activatedRoute.navigate(['users']);
  }

  onSubmitConnectForm() {
    const formValue = this.connectUserForm.value;
    const newUser = new UserConnect(
      formValue['emailCon'],
      formValue['passwordCon'],
    );
    this.isAuth = this.userService.connectUser(newUser);
    this.navBarService.setIsAuthValue(this.isAuth);
    this.cartService.setIsAuthValue(this.isAuth);

    this.itemListSessions = JSON.parse(JSON.stringify(sessionStorage.getItem('cart')));
    if (this.isAuth) {
      sessionStorage.setItem("email", newUser.email)
      // @ts-ignore
      if ( this.itemListSessions == null || "[]" === this.itemListSessions.toString()) {
        this.router.navigate(['../product']);
      } else {
        this.cartService.jointCartToUser(newUser);
        this.router.navigate(['../cart']);
      }
    }
  }
}
