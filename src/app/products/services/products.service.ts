import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Product, ProductsResponse } from '../interfaces/product-response.interface';
import { Observable, tap } from 'rxjs';
import { environment } from 'src/environments/environment';

const BASE_URL = environment.baseUrl;

interface Options {
  limit?: number;
  offset?: number;
  gender?: number;
}

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  private http = inject(HttpClient);

  public getProducts(options : Options) : Observable<ProductsResponse> {

    const { limit = 9, offset = 0, gender = '' } = options;

    return this.http
        .get<ProductsResponse>(`${BASE_URL}/products`, {
          params: {
            limit: limit,
            offset: offset,
            gender: gender
          }
        })
        .pipe(tap((resp) => console.log(resp)));
  }

  public getProductImage( imgURL : string ) : Observable<string> {
    return this.http.get<string>(`${BASE_URL}/files/product/${imgURL}`)
        .pipe(tap((resp) => console.log(resp)));
  }

  public getProductByIdSlug( id : string ) : Observable<Product> {
    return this.http.get<Product>(`${BASE_URL}/products/${id}`)
        .pipe(tap((resp) => console.log(resp)));
  }

}
