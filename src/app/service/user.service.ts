import {Injectable} from '@angular/core';
import {User} from "../model/user";
import {Address} from "../model/address";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {UserConnect} from "../model/user-connect";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  apiUrl = 'http://localhost:8080/customers';
  address !: Address;
  isAuth: boolean = false;
  user: UserConnect = {email: "", password: ""}

  constructor(private httpClient: HttpClient) {
  }

  addUser(newUser: User) {
    this.httpClient.post(this.apiUrl.concat("/createUser"), newUser).subscribe(
      (val) => {
        console.log("POST call successful value returned in body",
          val);
      },
      response => {
        console.log("POST call in error", response);
      },
      () => {
        console.log("The POST observable is now completed.");
      });
  }

  getOptions(): any {
    return {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      }),

      responseType: 'text',
    };
  }

  connectUser(newUser: UserConnect): boolean {
    this.httpClient.post(this.apiUrl.concat("/connectUser"), newUser).subscribe(
      // (val) => {
      //   console.log("POST call successful value returned in body",
      //     val);
      // },
      // response => {
      //   console.log("POST call in error", response);
      // },
      // @ts-ignore
      (s) => {
        if (s === true)
          this.isAuth = true;
        else
          this.isAuth = false;
      });
    // sessionStorage.setItem("isAuth", JSON.stringify(this.isAuth));
    // this.localSt.store("isAuth", this.isAuth)
    return this.isAuth;
  }
}
