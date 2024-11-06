import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './shared/header/header.component';
import { FooterComponent } from './shared/footer/footer.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { LoginComponent } from './auth/login/login.component';
import { NavComponent } from './shared/nav/nav.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule }  from '@angular/common/http';
import { JwtInterceptor } from './interceptors/jwt.interceptor';
import { UsersComponent } from './pages/users/users/users.component';
import { ProductosComponent } from './pages/productos/productos.component';
import { FilterPipe } from './filter.pipe';
import { AdminComponent } from './pages/admin/admin.component';
import { MatDialogModule } from '@angular/material/dialog';
import { EditarProductoModalComponent } from './modulos/editar-producto-modal/editar-producto-modal.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { BarraComponent } from './shared/barra/barra.component';
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    DashboardComponent,
    LoginComponent,
    NavComponent,
    UsersComponent,
    ProductosComponent,
    FilterPipe,
    AdminComponent,
    EditarProductoModalComponent,
    BarraComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    BrowserAnimationsModule,
    MatSlideToggleModule      
    

  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
