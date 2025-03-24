import { Component, computed, input, linkedSignal } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-pagination',
  imports: [RouterLink],
  templateUrl: './pagination.component.html',
})
export class PaginationComponent
{
  public pages = input(0);
  public currentPage = input<number>(1);

  public activePage = linkedSignal(this.currentPage); // ? se usa linkedSignal cuando no queremos tener actualizaciones del origen de la señal, ya que esta atada a cambios en de la señal currentpage

  getPagesList = computed(() => {
      return Array.from({ length: this.pages() }, (_, i) => i + 1);
    });
}
