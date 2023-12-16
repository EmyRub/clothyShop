import { Component, ElementRef, ViewChild, AfterViewInit, ViewChildren, QueryList, Input, OnInit } from '@angular/core';
import { Product, Category } from 'src/app/interfaces/shop.interface';

@Component({
  selector: 'app-carrusel',
  templateUrl: './carrusel.component.html',
  styleUrls: ['./carrusel.component.scss']
})
export class CarruselComponent implements AfterViewInit {

  @Input() type: string = '';
  @Input() products!: Product[];
  @Input() categories!: Category[];


  @ViewChildren('product') producto!: QueryList<ElementRef>
  @ViewChild('carruselList') list!: ElementRef<HTMLDivElement>;

  @ViewChild('carruselContent') fullContent!: ElementRef<HTMLDivElement>;

  productWidth: number = 0;
  listWidth: number = 0;
  carruselWidth: number = 0;
  leftPosition: number = 0;

  ngAfterViewInit(): void {
    this.setUp();
  }

  private setUp() {
    // Convertir la QueryList a un array y acceder al primer elemento
    const selectProduct = this.producto.toArray();

    if (selectProduct) {
      this.productWidth = selectProduct[0].nativeElement.offsetWidth;
      this.listWidth = this.list.nativeElement.offsetWidth;
      this.carruselWidth = this.fullContent.nativeElement.offsetWidth;
    }
  }

  moveLeft() {
    console.log(this.leftPosition)
    if (this.leftPosition > 0) {
      this.leftPosition = 1 * (this.leftPosition + this.productWidth);
    }
  }

  moveRight() {
    if (this.leftPosition < (this.listWidth - this.carruselWidth)) {
      this.leftPosition = -1 * (this.leftPosition + this.productWidth);
    }

  }

  selectPoints() {
   }


}
