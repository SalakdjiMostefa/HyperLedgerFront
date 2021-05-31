import {Injectable} from '@angular/core';
import {UserService} from "./user.service";

@Injectable({
  providedIn: 'root'
})
export class NavbarService {
  isAuth: boolean = false;
  nbrItem: number = 0;

  constructor(private userService: UserService) {
  }

  setIsAuthValue(isAuth: boolean) {
    this.isAuth = isAuth;
  }

  addItemNumber() {
    this.nbrItem += 1;
  }

  signOut() {
    this.isAuth = false;
  }
}
