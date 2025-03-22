import { Product } from '@/products/interfaces/product-response.interface';
import { ProductImagePipe } from '@/products/pipes/product-image.pipe';
import { ProductsService } from '@/products/services/products.service';
import { SlicePipe } from '@angular/common';
import { Component, inject, input } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'product-card',
  imports: [RouterLink, SlicePipe, ProductImagePipe],
  templateUrl: './product-card.component.html',
})
export class ProductCardComponent {
  private readonly productsService = inject(ProductsService);
  public readonly producto = input.required<Product>();

  public imgUrl = rxResource({
    request: () => this.producto().images,  // ? Request nos sirve para definir cuando queremos que se ejecute nuevamente el rxResource. Esto viene atado a una señal, que cuando cambia se ejecuta.
    loader: ({request}) => { // ? Loader nos ayuda a subscribirnos a un Observable por una unica vez y cuando termine la emision se destruye automaticamente.
      return this.productsService.getProductImage(this.producto().images[0]) ?? "";
    }
  });
}
