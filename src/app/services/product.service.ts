// product.service.ts
import { Injectable } from '@angular/core';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private products: Product[] = [];
  private nextId = 1;

  getAll(): Product[] {
    return [...this.products]; // copia
  }

  getById(id: number): Product | undefined {
    return this.products.find(p => p.id === id);
  }

  create(product: Omit<Product, 'id'>): void {
    this.products.push({ ...product, id: this.nextId++ });
  }

  update(id: number, product: Omit<Product, 'id'>): boolean {
    const index = this.products.findIndex(p => p.id === id);
    if (index === -1) return false;
    this.products[index] = { id, ...product };
    return true;
  }

  delete(id: number): void {
    this.products = this.products.filter(p => p.id !== id);
  }
}
