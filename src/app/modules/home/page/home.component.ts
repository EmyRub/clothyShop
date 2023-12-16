import { Component } from '@angular/core';
import { Product, Category } from 'src/app/interfaces/shop.interface';
import { ShopService } from 'src/app/services/shop.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  category!: Category[];
  products!: Product[];

  cat1: string = 'product';
  cat2: string = 'category';

  constructor(
    private shopService: ShopService
  ) { }

  ngOnInit(): void {
    this.getProducts();
    this.getCategories();
  }

  getProducts() {
    this.shopService.getProducts(12).subscribe(products => {
      this.products = products;
    })
  }

  getCategories() {
    this.shopService.getCategories(6).subscribe(categories => {
      this.category = categories;
    })
  }

}
