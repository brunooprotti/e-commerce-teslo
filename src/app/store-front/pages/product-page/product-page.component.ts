import { Product } from '@/products/interfaces/product-response.interface';
import { ProductsService } from '@/products/services/products.service';
import { Component, inject, Input, input } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { ProductCarrouselComponent } from "../../../products/components/product-carrousel/product-carrousel.component";

@Component({
  selector: 'app-product-page',
  imports: [ProductCarrouselComponent],
  templateUrl: './product-page.component.html',
})
export class ProductPageComponent {
  private readonly productService = inject(ProductsService);
  private readonly activatedRoute = inject(ActivatedRoute);
  private productIdSlug = this.activatedRoute.snapshot.params['idSlug'];

  public productResource = rxResource({
    request: () => ({ idSlug: this.productIdSlug }),
    loader : ({request}) => this.productService.getProductByIdSlug(request.idSlug)
  });
}
