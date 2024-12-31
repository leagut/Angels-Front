import { Component, OnInit } from '@angular/core';
import { ProductsService } from 'src/app/services/products/products.service';

@Component({
  selector: 'app-sales-chart',
  templateUrl: './sales-chart.component.html',
  styleUrls: ['./sales-chart.component.css']
})
export class SalesChartComponent implements OnInit {
  

  chartOptions: any;
  products: string[] = []; // Lista de productos para el desplegable
  selectedProduct: string = ''; // Producto seleccionado

  constructor(private productsService: ProductsService) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.productsService.getSalesData().subscribe(data => {
      // Extrae los nombres únicos de los productos
      this.products = [...new Set(data.map(item => item.nombreProducto))]; // Map correcto
      // Selecciona el primer producto por defecto
      this.selectedProduct = this.products[0];
      this.updateChart();
    });
  }

  // Actualiza el gráfico basado en el producto seleccionado
  updateChart(): void {
    this.productsService.getSalesData().subscribe(data => {
      // Filtra datos solo del producto seleccionado
      const filteredData = data.filter((item: any) => item.nombreProducto === this.selectedProduct);

      const months = filteredData.map((item: any) => `Mes ${item.mes}`);
      const sales = filteredData.map((item: any) => item.cantidadVendida);

      this.chartOptions = {
        xAxis: {
          type: 'category',
          data: months,
          axisLine: {
            lineStyle: {
              color: '#DDDDDD' // Color de la línea del eje X
            }
          },
          axisLabel: {
            color: '#DDDDDD', // Color de las etiquetas ("mes")
            fontSize: 14 // Tamaño de la fuente
          }
        },
        yAxis: {
          type: 'value',
          axisLine: {
            lineStyle: {
              color: '#666666' // Color de la línea del eje Y
            }
          },
          axisLabel: {
            color: '#DDDDDD', // Color de los números
            fontSize: 14 // Tamaño de la fuente
          },
          splitLine: {
            lineStyle: {
              color: '#DDDDDD' // Color de las líneas detrás de las barras
            }
          }
        },
        series: [
          {
            name: 'Ventas',
            type: 'bar',
            data: sales,
            barWidth: '20%', // Ancho de las barras
            itemStyle: {
              color: '#feac1f' // Color de las barras
            }
          }
        ]
      };




    });
  }

  // Evento cuando se selecciona un nuevo producto
  onProductSelect(event: Event): void {
    this.selectedProduct = (event.target as HTMLSelectElement).value;
    this.updateChart();
  }

}
