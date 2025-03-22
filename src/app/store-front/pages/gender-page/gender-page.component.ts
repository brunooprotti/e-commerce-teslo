import { ProductsService } from '@/products/services/products.service';
import { Component, inject } from '@angular/core';
import { rxResource, toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs';
import { ProductCardComponent } from "../../../products/components/product-card/product-card.component";

@Component({
  selector: 'app-gender-page',
  imports: [ProductCardComponent],
  templateUrl: './gender-page.component.html',
})
export class GenderPageComponent {
  route = inject(ActivatedRoute);
  private readonly productsService = inject(ProductsService);

  gender = toSignal(this.route.params.pipe(
    map(({gender}) => gender)
  ));


  public productResource = rxResource({
    request: () => ({gender: this.gender()}),  // ? Request nos sirve para definir cuando queremos que se ejecute nuevamente el rxResource. Esto viene atado a una señal, que cuando cambia se ejecuta.
    loader: ({request}) => { // ? Loader nos ayuda a subscribirnos a un Observable por una unica vez y cuando termine la emision se destruye automaticamente.
      return this.productsService.getProducts({
        gender: request.gender
      });
    }
  });
}
