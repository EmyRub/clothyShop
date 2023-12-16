import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

//Se agrega AppRouting para activar routerLink
import { AppRoutingModule } from '../app-routing.module';
import { MenuComponent } from './menu/menu.component';
import { FooterComponent } from './footer/footer.component';
import { ComponentsModule } from '../components/components.module';


@NgModule({
  declarations: [
    MenuComponent,
    FooterComponent
  ],
  imports: [
    AppRoutingModule,
    CommonModule,
    ComponentsModule
  ],
  exports: [
    MenuComponent,
    FooterComponent
  ]
})
export class SharedModule { }
