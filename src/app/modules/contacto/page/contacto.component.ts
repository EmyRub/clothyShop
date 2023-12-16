import { Component } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators, FormArray } from '@angular/forms';

@Component({
  selector: 'app-contacto',
  templateUrl: './contacto.component.html',
  styleUrls: ['./contacto.component.scss']
})
export class ContactoComponent {

  constructor(
    private fb: FormBuilder
  ) { }

  formulario: FormGroup = this.fb.group({

    nombre: ['', [Validators.required, Validators.minLength(3)]],
    apellidos: ['', [Validators.required, Validators.minLength(3)]],
    telefono: ['', [Validators.min(9)]],
    email: ['', [Validators.required, Validators.email]],

    genero: this.fb.group({
      femenino: [''],
      masculino: ['']
    }),

    talla: this.fb.group({
      chica: [''],
      mediana: [''],
      grande: ['']
    }),

    color: [''],
    fecha: [''],

    referencia: [''],

    direccion: this.fb.group({
      estado: ['', [Validators.required]],
      municipio: ['', [Validators.required]],
      colonia: [''],
      calle: [''],
      cp: ['']
    }),

    intereses: this.fb.array([
      this.fb.control('')
    ]),

    mensaje: ['']
  })

  formulario11: FormGroup = new FormGroup({

    nombre: new FormControl('', []),
    apellidos: new FormControl(''),
    telefono: new FormControl(''),
    email: new FormControl(''),

    color: new FormControl(''),
    fecha: new FormControl(''),

    referencia: new FormControl(''),

    genero: new FormGroup({
      femenino: new FormControl(),
      masculino: new FormControl()
    }),

    talla: new FormGroup({
      chica: new FormControl('chica'),
      mediana: new FormControl('mediana'),
      grande: new FormControl('grande')
    }),

    direccion: new FormGroup({
      estado: new FormControl(''),
      municipio: new FormControl(''),
      colonia: new FormControl(''),
      calle: new FormControl(''),
      cp: new FormControl('')
    }),

    mensaje: new FormControl('')

  })


  guardar() {
    if (this.formulario.invalid) {
      this.formulario.markAllAsTouched();
      return;
    }

    this.formulario.reset();
  }

  isValidField(field: string): boolean | null {
    return this.formulario.controls[field].errors
      && this.formulario.controls[field].touched;
  }

  isErrorTrue(field: string) {
    return this.formulario.controls[field].errors;
  }

  getFieldError(field: string): string | null {

    if (!this.formulario.controls[field]) return null;

    const errors = this.formulario.controls[field].errors || {};

    for (const key of Object.keys(errors)) {

      switch (key) {

        case 'requiered':
          return 'Este campo es requerido';

        case 'minlength':
          return `Mínimo ${errors['minlength'].requiredLength} caracters.`
      }
    }
    return null;

  }

}
