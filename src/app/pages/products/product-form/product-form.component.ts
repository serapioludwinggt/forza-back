import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ProductService } from '../../../services/product.service';
import { Product } from '../../../models/product.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NavbarComponent } from '../../../shared/navbar/navbar.component';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  imports: [
    CommonModule,
    NavbarComponent,
    FormsModule,
    RouterModule,
  ],
})
export class ProductFormComponent implements OnInit {
  isEditMode = false;
  product: Omit<Product, 'id'> = { name: '', price: 0, description: '' };
  id!: number;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private productService: ProductService
  ) {}

  ngOnInit() {
    const paramId = this.route.snapshot.paramMap.get('id');
    if (paramId) {
      this.isEditMode = true;
      this.id = Number(paramId);
      const existing = this.productService.getById(this.id);
      if (existing) {
        this.product = {
          name: existing.name,
          price: existing.price,
          description: existing.description
        };
      } else {
        alert('Producto no encontrado');
        this.router.navigate(['/products']);
      }
    }
  }

  onSubmit() {
    if (this.isEditMode) {
      this.productService.update(this.id, this.product);
    } else {
      this.productService.create(this.product);
    }
    this.router.navigate(['/products']);
  }
}
