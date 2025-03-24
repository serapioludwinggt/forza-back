import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../../services/product.service';
import { Product } from '../../../models/product.model';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html'
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
