import { ProductsService } from '@/products/services/products.service';
import { Component, inject } from '@angular/core';
import { rxResource, toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs';
import { PaginationService } from '@/shared/components/pagination/pagination.service';
import { ProductCardComponent } from '@/products/components/product-card/product-card.component';
import { PaginationComponent } from '@/shared/components/pagination/pagination.component';

@Component({
  selector: 'app-gender-page',
  imports: [ProductCardComponent, PaginationComponent],
  templateUrl: './gender-page.component.html',
})
export class GenderPageComponent {
  private route = inject(ActivatedRoute);
  private readonly productsService = inject(ProductsService);
  public paginationService: PaginationService = inject(PaginationService);

  gender = toSignal(this.route.params.pipe(
    map(({gender}) => gender)
  ));


  public productResource = rxResource({
    request: () => ({gender: this.gender(), page: this.paginationService.currentPage() - 1}),  // ? Request nos sirve para definir cuando queremos que se ejecute nuevamente el rxResource. Esto viene atado a una señal, que cuando cambia se ejecuta.
    loader: ({request}) => { // ? Loader nos ayuda a subscribirnos a un Observable por una unica vez y cuando termine la emision se destruye automaticamente.
      return this.productsService.getProducts({
        gender: request.gender,
        offset: request.page * 9
      });
    }
  });
}
