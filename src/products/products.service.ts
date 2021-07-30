import { Injectable } from '@nestjs/common';
import { DeleteResult, Repository } from 'typeorm';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';
import {  InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ProductsService {
  
  constructor(@InjectRepository(Product) private productRepo: Repository<Product>) {}

  create(createProductDto: CreateProductDto): Promise<Product> {
    const product:Product = this.productRepo.create( createProductDto );
    return this.productRepo.save(product);
  }

  findAll(): Promise<Product[]> {
    return this.productRepo.find();
  }

  findOne(id: string): Promise<Product> {
    return this.productRepo.findOne(id);
  }

  async update(id: string, updateProductDto: UpdateProductDto): Promise<Product> {
    await this.productRepo.update(id, updateProductDto);
    return this.productRepo.findOne(id);
  }

  async remove(id: string): Promise<DeleteResult | void> {
    await this.productRepo.delete(id);
  }
}
