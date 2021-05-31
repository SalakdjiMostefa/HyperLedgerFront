import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  apiUrl = 'http://localhost:8080/catalog';
  item: any;
  items: any;

  constructor(private httpClient: HttpClient) {
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

  getProductFromServer(id: string) {
    const options = this.getOptions();
    return this.httpClient.get(this.apiUrl.concat("/findItem/" + id), {...options});
  }

  getAllProductsFromServer() {
    const options = this.getOptions();
    return this.httpClient.get(this.apiUrl.concat("/findItems"), {...options});
  }
}
