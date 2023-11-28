import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './page/home.component';

//Se agrega AppRouting para activar routerLink
import { AppRoutingModule } from '../../app-routing.module';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  declarations: [
    HomeComponent
  ],
  imports: [
    AppRoutingModule,
    CommonModule,
    ComponentsModule
  ]
})
export class HomeModule { }
