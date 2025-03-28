import { AuthService } from '@/auth/services/Auth.service';
import { AuthStatusTypes } from '@/shared/enums/AuthStatus.enum';
import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'front-navbar',
  imports: [RouterLink,RouterLinkActive],
  templateUrl: './front-navbar.component.html',
})
export class FrontNavbarComponent {
  public authService = inject(AuthService);
  public authStatus = AuthStatusTypes;

}
