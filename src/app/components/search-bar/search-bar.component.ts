import { Component, ElementRef, ViewChild } from '@angular/core';
import { ShopService } from '../../services/shop.service';

@Component({
  selector: 'search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent {

  @ViewChild('search') searchBox!: ElementRef<HTMLInputElement>;

  constructor(
    private shopService: ShopService
  ) { }

  searchQuery() {
    const value = this.searchBox.nativeElement.value;
   
    this.shopService.searchQuery(value);
    this.searchBox.nativeElement.value = '';
  }

}
