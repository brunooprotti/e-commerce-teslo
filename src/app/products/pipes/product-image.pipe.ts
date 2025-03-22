import { Pipe, PipeTransform } from '@angular/core';
import { environment } from 'src/environments/environment';

const BASE_URL = environment.baseUrl;

@Pipe({
  name: 'productImage'
})

export class ProductImagePipe implements PipeTransform {
  transform(value: string | string[]): string {
    if (typeof(value) === 'string'){
      return `${BASE_URL}/files/product/${value}`;
    }

    const image = value.at(0);

    if (!image){
      return `./assets/images/no-image.jpg`;
    }

    return `${BASE_URL}/files/product/${image}`;
  }
}
