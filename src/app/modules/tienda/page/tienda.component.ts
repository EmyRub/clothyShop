import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/interfaces/shop.interface';
import { ShopService } from 'src/app/services/shop.service';

@Component({
  selector: 'app-tienda',
  templateUrl: './tienda.component.html',
  styleUrls: ['./tienda.component.scss']
})
export class TiendaComponent implements OnInit {

  productos!: Product[];
  

  constructor(
    private shopSer: ShopService
  ) { }

  ngOnInit(): void {
    this.getAllProducts()
  }


  getAllProducts() {

    this.shopSer.getProducts(0)
      .subscribe(products => {
        this.productos = products
        console.log(products)
      })
      
  }

}
