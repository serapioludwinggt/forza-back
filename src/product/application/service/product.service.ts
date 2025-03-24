// src/modules/product/product.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductEntity } from './../../domain/entity/product.entity';
import { CreateProductDto } from './../../domain/dto/create-product.dto';
import { UpdateProductDto } from './../../domain/dto/update-product.dto';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(ProductEntity)
    private readonly productRepository: Repository<ProductEntity>,
  ) {}

  async create(data: CreateProductDto): Promise<ProductEntity> {
    const product = this.productRepository.create(data);
    return this.productRepository.save(product);
  }

  async findAll(): Promise<ProductEntity[]> {
    return this.productRepository.find();
  }

  async findOne(id: number): Promise<ProductEntity> {
    const product = await this.productRepository.findOneBy({ id });
    if (!product) throw new NotFoundException('Product not found');
    return product;
  }

  async update(id: number, data: UpdateProductDto): Promise<ProductEntity> {
    await this.findOne(id); // throw if not found
    await this.productRepository.update(id, data);
    return this.findOne(id); // return updated version
  }

  async delete(id: number): Promise<void> {
    await this.findOne(id); // throw if not found
    await this.productRepository.delete(id);
  }
}
