import { Component, ElementRef, ViewChild } from '@angular/core';
import { ShopService } from '../../services/shop.service';
import { Product } from 'src/app/interfaces/shop.interface';

@Component({
  selector: 'search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent {

  @ViewChild('search') searchBox!: ElementRef<HTMLInputElement>;
  listSearch: Product[] = [];

  constructor(
    private shopService: ShopService
  ) { }

  
  searchQuery(value:string) {
    //La consulta se guarda en el servicio
    this.shopService.searchQuery(value)?.subscribe(products => {
      this.listSearch = products;
    })
  }

}
