import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NosotrosComponent } from './page/nosotros.component';
import { ComponentsModule } from 'src/app/components/components.module';



@NgModule({
  declarations: [
    NosotrosComponent
  ],
  imports: [
    CommonModule
  ]
})
export class NosotrosModule { }
