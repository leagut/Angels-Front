import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { LoginComponent } from './auth/login/login.component';
import { UsersComponent } from './pages/users/users/users.component';
import { ProductosComponent } from './pages/productos/productos.component';
import { AdminComponent } from './pages/admin/admin.component';

const routes: Routes = [

  {path:'',redirectTo:'/productos',pathMatch:'full'},
  {path: 'productos' , component:ProductosComponent},
  {path:'inicio',component:DashboardComponent},
  {path:'iniciar-sesion',component:LoginComponent},
  {path: 'users', component: UsersComponent},
  {path: 'admin', component: AdminComponent}
  


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
