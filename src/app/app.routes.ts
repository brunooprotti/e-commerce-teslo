import { Routes } from '@angular/router';
import { NotAuthenticatedGuard } from './auth/guards/not-authenticated.guard';

export const routes: Routes = [
  {
    path:'auth',
    loadChildren: () => import('./auth/auth.routes'),
    canMatch: [NotAuthenticatedGuard, () => {
      //Se puede agregar funciones a ejecutar, podemos invertir el lugar y primero se ejecuta la funcion y luego el guard
    }]
  },
  {
    path:'',
    loadChildren: () => import('./store-front/store-front.routes')
  }
];
