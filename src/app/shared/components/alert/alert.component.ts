import { ErrorAlert } from '@/shared/interfaces/error-alert';
import { Component, input } from '@angular/core';



@Component({
  selector: 'app-alert',
  imports: [],
  templateUrl: './alert.component.html',
})

export class AlertComponent {
  public error = input<ErrorAlert>( { message: 'Por favor revise la información ingresada.' } );
}
