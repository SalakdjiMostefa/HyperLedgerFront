import {Component, OnInit, Renderer2} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {UserService} from "../../service/user.service";
import {User} from "../../model/user";
import {UserConnect} from "../../model/user-connect";
import {NavbarService} from "../../service/navbar.service";
import {CartService} from "../../service/cart.service";
import {Item} from "../../model/item";
import {Router} from "@angular/router";
import {Order} from "../../model/order";

@Component({
  selector: 'app-connection',
  templateUrl: './connection.component.html',
  styleUrls: ['./connection.component.scss']
})
export class ConnectionComponent implements OnInit {
  createUserForm!: FormGroup;
  connectUserForm!: FormGroup;
  connectUserAdminForm!: FormGroup;
  isAuth: boolean = false;
  itemListSession: Item[] = [];
  itemListSessions: Item[] = [];
  isAdmin: boolean = false;

  constructor(private userService: UserService,
              private formBuilder: FormBuilder,
              private navBarService: NavbarService,
              private cartService: CartService,
              private router: Router,
              private _renderer2: Renderer2
  ) {
  }

  ngOnInit(): void {
    this.initUserForm();
    this.initConnectUserForm();
    this.initConnectUserAdminForm();
  }

  initConnectUserForm() {
    this.connectUserForm = this.formBuilder.group({
      isAdmin: [false, [Validators.required]],
      emailCon: ['', [Validators.required, Validators.email]],
      passwordCon: ['', Validators.required],
    });
  }

  initConnectUserAdminForm() {
    this.connectUserAdminForm = this.formBuilder.group({
      isAdmin: [false, [Validators.required]],
      emailConn: ['', [Validators.required, Validators.email]],
      passwordConn: ['', Validators.required],
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
    if (this.isAuth && this.isAdmin) {
      this.router.navigate(['../ledger']);
    } else {
      sessionStorage.setItem("email", newUser.email)
      // @ts-ignore
      if (this.itemListSessions == null || "[]" === this.itemListSessions.toString()) {
        this.router.navigate(['../product']);
      } else {
        this.cartService.jointCartToUser(newUser);
        this.router.navigate(['../cart']);
      }
    }
  }

  cleanModalOpen() {

  }

  onSubmitConnectAdminForm() {
    this.router.navigate([]);

    const formValue = this.connectUserAdminForm.value;
    const newUser = new UserConnect(
      formValue['emailConn'],
      formValue['passwordConn'],
    );
    this.isAuth = this.userService.connectUser(newUser);
    this.navBarService.setIsAuthValue(this.isAuth);
    this.cartService.setIsAuthValue(this.isAuth);

    if (this.isAuth && this.isAdmin) {
      this.router.navigate(['../ledger']);
    } else {
      this.router.navigate(['../connection']);
    }
  }

  testCheck($event: Event) {
    // this.isAdmin = 'true';
    // @ts-ignore
    this.isAdmin = $event.target.checked;
    // console.log($event.target.checked);
    console.log(this.isAdmin);
  }
}
