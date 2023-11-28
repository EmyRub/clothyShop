import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './modules/home/page/home.component';
import { NosotrosComponent } from './modules/nosotros/page/nosotros.component';
import { BlogComponent } from './modules/blog/page/blog.component';
import { TiendaComponent } from './modules/tienda/page/tienda.component';
import { ContactoComponent } from './modules/contacto/page/contacto.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'nosotros', component: NosotrosComponent},
  {path: 'tienda', component: TiendaComponent},
  {path: 'blog', component: BlogComponent},
  {path: 'contacto', component: ContactoComponent},
  {path: '**', component: HomeComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
