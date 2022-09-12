import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

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
    password: [ '', Validators.required ],
    password2: [ '', Validators.required ],
    terminos: [ false, Validators.required ]
  });
  
  constructor( private fb: FormBuilder ) { }

  crearUsuario() {
    this.formSubmitted = true;  
    console.log( this.registerForm.value );

    this.registerForm.valid ? console.log( 'Posteando formulario' ) 
                            : console.log( 'Formulario no es correcto' );
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
}
