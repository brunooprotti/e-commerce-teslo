import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Product, ProductsResponse } from '../interfaces/product-response.interface';
import { Observable, of, tap } from 'rxjs';
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

  private productsCache = new Map<string,ProductsResponse>();
  private productCache = new Map<string,Product>();

  public getProducts(options : Options) : Observable<ProductsResponse> {

    const { limit = 9, offset = 0, gender = '' } = options;

    const key = `${limit}-${offset}-${gender}`;

    if( this.productsCache.has(key)) {
      return of(this.productsCache.get(key)!);
    }

    return this.http
        .get<ProductsResponse>(`${BASE_URL}/products`, {
          params: {
            limit: limit,
            offset: offset,
            gender: gender
          }
        }).pipe(
          tap((resp) => console.log(resp)),
          tap((resp) => this.productsCache.set(key, resp)),
        );
  }

  public getProductImage( imgURL : string ) : Observable<string> {
    return this.http.get<string>(`${BASE_URL}/files/product/${imgURL}`)
        .pipe(tap((resp) => console.log(resp)));
  }

  public getProductByIdSlug( idSlug : string ) : Observable<Product> {


    if( this.productCache.has(idSlug)) {
      return of(this.productCache.get(idSlug)!);
    }

    return this.http.get<Product>(`${BASE_URL}/products/${idSlug}`)
        .pipe(
          tap( (resp) => console.log(resp) ),
          tap( (resp) => this.productCache.set(idSlug, resp) )
        );
  }

}
