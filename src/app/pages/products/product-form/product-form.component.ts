import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ProductService } from '../../../services/product.service';
import { Product } from '../../../models/product.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NavbarComponent } from '../../../shared/navbar/navbar.component';

@Component({
  selector: 'app-product-form',
  standalone: true,
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
  errorMessage = '';

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

      this.productService.getById(this.id).subscribe({
        next: (product) => {
          this.product = {
            name: product.name,
            price: product.price,
            description: product.description
          };
        },
        error: (err) => {
          this.errorMessage = 'Producto no encontrado.';
          console.error(err);
          this.router.navigate(['/products']);
        }
      });
    }
  }

  onSubmit() {
    if (this.isEditMode) {
      this.productService.update(this.id, this.product).subscribe({
        next: () => this.router.navigate(['/products']),
        error: (err) => {
          this.errorMessage = 'Error al actualizar el producto.';
          console.error(err);
        }
      });
    } else {
      this.productService.create(this.product).subscribe({
        next: () => this.router.navigate(['/products']),
        error: (err) => {
          this.errorMessage = 'Error al crear el producto.';
          console.error(err);
        }
      });
    }
  }
}
