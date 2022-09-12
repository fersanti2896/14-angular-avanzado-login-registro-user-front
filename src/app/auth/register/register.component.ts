import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2'

import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: [ './register.component.css' ]
})
export class RegisterComponent {

  public formSubmitted = false;

  public registerForm = this.fb.group({
    nombre: [ 'Fer Santi', [ Validators.required, Validators.minLength(3) ] ],
    email: [ 'test100@gmail.com', [ Validators.required, Validators.email ] ],
    password: [ '1234', Validators.required ],
    password2: [ '1234', Validators.required ],
    terminos: [ true, Validators.required ]
  }, {
    validators: this.passwordsIguales( 'password', 'password2' )
  });
  
  constructor( private fb: FormBuilder, 
               private usuarioService: UsuarioService ) { }

  crearUsuario() {
    this.formSubmitted = true;  
    console.log( this.registerForm.value );

    if ( this.registerForm.invalid ) { return; }

    /* Se crea el usuario */
    this.usuarioService.crearUsuario( this.registerForm.value )
                      .subscribe( resp => {
                        console.log('Usuario creado');
                        console.log(resp);
                      }, ( err ) => {
                       /* Si sucede un error */
                       Swal.fire('Error', err.error.msg, 'error');
                      });
  }

  campoNoValido( campo: string ): boolean {
    if( this.registerForm.get( campo )?.invalid && this.formSubmitted ) { 
      return true;
    } else {
      return false;
    }
  }

  aceptaTerminos() {
    return !this.registerForm.get('terminos')?.value && this.formSubmitted;
  }

  passwordsNoValidas() {
    const pass1 = this.registerForm.get('password')!.value;
    const pass2 = this.registerForm.get('password2')!.value;

    return pass1 !== pass2  && this.formSubmitted ? true : false
  }

  passwordsIguales( pass1Name: string, pass2Name: string ) {
    return ( formGroup: FormGroup ) => {
      const pass1Control = formGroup.get(pass1Name);
      const pass2Control = formGroup.get(pass2Name);  

      pass1Control!.value === pass2Control!.value ? pass2Control?.setErrors(null)
                                                  : pass2Control?.setErrors({ noEsIgual: true })
    }  
  }
}
