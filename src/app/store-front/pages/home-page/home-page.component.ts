import { ProductCardComponent } from '@/products/components/product-card/product-card.component';
import { ProductsService } from '@/products/services/products.service';
import { PaginationComponent } from '@/shared/components/pagination/pagination.component';
import { PaginationService } from '@/shared/components/pagination/pagination.service';
import { Component, inject } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';


@Component({
  selector: 'app-home-page',
  imports: [ProductCardComponent, PaginationComponent],
  templateUrl: './home-page.component.html',
})
export class HomePageComponent {

  private readonly productsService = inject(ProductsService);

  public paginationService: PaginationService = inject(PaginationService);

  public productResource = rxResource({
    request: () => ({page: this.paginationService.currentPage() - 1}),  // ? Request nos sirve para definir cuando queremos que se ejecute nuevamente el rxResource. Esto viene atado a una señal, que cuando cambia se ejecuta.
    loader: ({request}) => { // ? Loader nos ayuda a subscribirnos a un Observable por una unica vez y cuando termine la emision se destruye automaticamente.
      return this.productsService.getProducts({
        offset: request.page * 9
      });
    }
  });
}
