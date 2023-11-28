import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SliderComponent } from './slider/slider.component';
import { CarruselComponent } from './carrusel/carrusel.component';



@NgModule({
  declarations: [
    SliderComponent,
    CarruselComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    CarruselComponent,
    SliderComponent
  ]
})
export class ComponentsModule { }
