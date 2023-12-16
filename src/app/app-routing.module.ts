import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './modules/home/page/home.component';
import { NosotrosComponent } from './modules/nosotros/page/nosotros.component';
import { BlogComponent } from './modules/blog/page/blog.component';
import { TiendaComponent } from './modules/tienda/page/tienda.component';
import { ContactoComponent } from './modules/contacto/page/contacto.component';

const routes: Routes = [
  {path: '', title:'Home', component: HomeComponent},
  {path: 'nosotros', title:'Nosotros', component: NosotrosComponent},
  {path: 'tienda', title:'Tienda', component: TiendaComponent},
  {path: 'blog', title:'Blog', component: BlogComponent},
  {path: 'contacto', title:'Contacto', component: ContactoComponent},
  {path: '**', component: HomeComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
