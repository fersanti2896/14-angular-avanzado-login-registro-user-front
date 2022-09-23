import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { UsuarioService } from 'src/app/services/usuario.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  public formSubmitted = false;

  public loginForm = this.fb.group( {
    email: [ localStorage.getItem('email') || '', [ Validators.required, Validators.email ] ],
    password: [ '', Validators.required ],
    remember: [ false ]
  });

  constructor( private fb: FormBuilder,
               private usuarioService: UsuarioService ) { }

  login() {
    /* Se inicia sesion */
    this.usuarioService.login( this.loginForm.value )
                        .subscribe( resp => {
                          if( this.loginForm.get('remember')?.value ) {
                            localStorage.setItem('email', this.loginForm.get('email')?.value! );
                          } else {
                            localStorage.removeItem('email');
                          }
                        }, (err) => {
                          /* Si sucede un error */
                          Swal.fire('Error', err.error.msg, 'error');
                        });
  }

  campoNoValido( campo: string ): boolean {
    if( this.loginForm.get( campo )?.invalid && this.formSubmitted ) { 
      return true;
    } else {
      return false;
    }
  }
}
