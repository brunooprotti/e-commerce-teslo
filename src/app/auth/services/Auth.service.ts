import { computed, inject, Injectable, signal } from '@angular/core';
import { User } from '../interfaces/user.interface';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { AuthResponse } from '../interfaces/auth-response.interface';
import { catchError, map, Observable, of, tap } from 'rxjs';
import { rxResource } from '@angular/core/rxjs-interop';
import { AuthStatusTypes } from '@/shared/enums/AuthStatus.enum';

const BASE_URL = environment.baseUrl;

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _authStatus = signal<AuthStatusTypes>(AuthStatusTypes.Checking);
  private _user = signal<User | null>(null);
  private _token = signal<string | null>( localStorage.getItem('token') ); //? localStorage para que cuando se cree el servicio accedamos a la info guardada.

  private http = inject(HttpClient);

  public checkStatusResource = rxResource({
    loader: () => this.checkStatus()
  });

  public authStatus = computed( () => {
    if (this._authStatus() === AuthStatusTypes.Checking)
      return AuthStatusTypes.Checking;

    if (this._user())
      return AuthStatusTypes.Authenticated;

    return AuthStatusTypes.NonAuthenticated;
  });

  public user = computed<User | null>( () => this._user());
  public token = computed<string | null>( () => this._token());


  public Login(email: string, password: string) : Observable<boolean> {
    return this.http.post<AuthResponse>(`${BASE_URL}/auth/login`,{
      email,
      password
    }).pipe(
      map(resp => this.handleAuthSuccess(resp)),
      catchError((error:any) => this.handleAuthError(error))
    );
  }
  public Register(fullName: string, email: string, password: string) : Observable<boolean> {
    return this.http.post<AuthResponse>(`${BASE_URL}/auth/register`,{
      fullName,
      email,
      password
    }).pipe(
      map(resp => this.handleAuthSuccess(resp)),
      catchError((error:any) => this.handleAuthError(error))
    );
  }

  public checkStatus() : Observable<boolean>{
    const token = localStorage.getItem('token');
    if ( !token )
      return of(false);

    return this.http.get<AuthResponse>(`${BASE_URL}/auth/check-status`)
    .pipe(
      tap(resp => this.handleAuthSuccess(resp)),
      map(() => true),
      catchError((error:any) => this.handleAuthError(error))
    );
  }

  public logout() : void
  {
    this._user.set(null);
    this._token.set(null);
    this._authStatus.set(AuthStatusTypes.NonAuthenticated);

    localStorage.removeItem('token');
  }

  private handleAuthSuccess(resp: AuthResponse) : boolean {
    this._user.set(resp.user);
    this._authStatus.set(AuthStatusTypes.Authenticated);
    this._token.set(resp.token);

    localStorage.setItem('token', resp.token);

    return true;
  }

  private handleAuthError(error:any) : Observable<boolean> {
    console.log(error);
    this.logout();
    return of(false);
  }

}
