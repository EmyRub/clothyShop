import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule} from '@angular/common/http';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { HomeModule } from './modules/home/home.module';
import { ContactoModule } from './modules/contacto/contacto.module';
import { TiendaModule } from './modules/tienda/tienda.module';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    ContactoModule,
    HomeModule,
    TiendaModule,
    HttpClientModule,
    SharedModule,  
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
