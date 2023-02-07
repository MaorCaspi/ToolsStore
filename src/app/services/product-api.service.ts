import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductApiService {

  readonly productAPIUrl = "https://localhost:7175/api/products/";

  constructor(private http:HttpClient) { }

  getProductList():Observable<any[]> {
    return this.http.get<any>(this.productAPIUrl);
  }

  addProduct(data:any) {
    return this.http.post(this.productAPIUrl, data);
  }

  updateProduct(id:number|string, data:any) {
    return this.http.put(this.productAPIUrl + id , data);
  }
}
