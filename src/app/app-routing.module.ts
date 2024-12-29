import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { LoginComponent } from './auth/login/login.component';
import { UsersComponent } from './pages/users/users/users.component';
import { ProductosComponent } from './pages/productos/productos.component';
import { AdminComponent } from './pages/admin/admin.component';
import { BarraComponent } from './shared/barra/barra.component';
import { CategoriaComponent } from './pages/categoria/categoria.component';
import { StockComponent } from './pages/stock/stock.component';

const routes: Routes = [

  {path:'',redirectTo:'/productos',pathMatch:'full'},
  {path: 'productos' , component:ProductosComponent},
  {path:'inicio',component:DashboardComponent},
  {path:'iniciar-sesion',component:LoginComponent},
  {path: 'users', component: UsersComponent},  
  {path: 'barra', component: BarraComponent,
    children: [
      { path: 'admin', component: AdminComponent },
      { path: 'categoria', component: CategoriaComponent },
      { path: 'stock', component: StockComponent}
    ]
  }
  


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
