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
import { CategoriaComponent } from './pages/categoria/categoria.component';
import { AddproductComponent } from './modulos/addproduct/addproduct.component';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { CarComponent } from './modulos/car/car.component';
import { CommonModule } from '@angular/common';
import { StockComponent } from './pages/stock/stock.component';
import { NgxEchartsModule } from 'ngx-echarts';
import { SalesChartComponent } from './pages/sales-chart/sales-chart.component';
import { MensajecompraComponent } from './modulos/mensajecompra/mensajecompra.component';


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
    BarraComponent,
    CategoriaComponent,
    AddproductComponent,
    CarComponent,
    StockComponent,
    SalesChartComponent,
    MensajecompraComponent
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
    MatSlideToggleModule,
    MatSelectModule,
    MatOptionModule,
    MatCheckboxModule,      
    CommonModule,
    NgxEchartsModule.forRoot({
      echarts: () => import('echarts'),
    }) 

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
