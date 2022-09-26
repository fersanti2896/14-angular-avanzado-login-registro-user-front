import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';

import { environment } from 'src/environments/environment';

import { LoginForm } from '../interfaces/login-form.interface';
import { RegisterForm } from '../interfaces/register-form.interface';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor( private http: HttpClient ) { }

  crearUsuario( formData: RegisterForm ) {
    return this.http.post( `${ base_url }/usuarios`, formData )
                    .pipe(
                      tap(( resp: any ) => {
                        localStorage.setItem('token', resp.token);
                      })
                    );
  }

  login( formData: any ) {
    const formLogin: LoginForm = formData;

    return this.http.post( `${ base_url }/login`, formLogin )
                    .pipe(
                      tap(( resp: any ) => {
                        localStorage.setItem('token', resp.token);
                      })
                    );
  }

  loginGogle( token: string ) {
    return this.http.post( `${ base_url }/login/google`, { token } )
                    .pipe(
                      tap(( resp: any ) => {
                        localStorage.setItem('token', resp.token);
                      })
                    )
  }
}
