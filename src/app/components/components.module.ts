import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SliderComponent } from './slider/slider.component';
import { CarruselComponent } from './carrusel/carrusel.component';
import { SearchBarComponent } from './search-bar/search-bar.component';

@NgModule({
  declarations: [
    SliderComponent,
    CarruselComponent,
    SearchBarComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    CarruselComponent,
    SliderComponent,
    SearchBarComponent
  ]
})
export class ComponentsModule { }
