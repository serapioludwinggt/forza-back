import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../../services/product.service';
import { Product } from '../../../models/product.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NavbarComponent } from '../../../shared/navbar/navbar.component';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  imports: [
    CommonModule,
    NavbarComponent,
    FormsModule,
    RouterModule,
  ],
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts() {
    this.products = this.productService.getAll();
  }

  delete(id: number) {
    if (confirm('¿Estás seguro de eliminar este producto?')) {
      this.productService.delete(id);
      this.loadProducts();
    }
  }
}
