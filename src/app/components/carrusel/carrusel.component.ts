import { Component, ElementRef, ViewChild, AfterViewInit, ViewChildren, QueryList, Input, OnInit } from '@angular/core';
import { Product, Category } from 'src/app/interfaces/shop.interface';

@Component({
  selector: 'app-carrusel',
  templateUrl: './carrusel.component.html',
  styleUrls: ['./carrusel.component.scss']
})
export class CarruselComponent implements AfterViewInit {

  @Input() type: string = 'product';
  @Input() products!: Product[];
  @Input() categories!: Category[];


  @ViewChildren('product') productos!: QueryList<ElementRef>
  @ViewChild('carruselContent') carruselView!: ElementRef<HTMLDivElement>;
  @ViewChild('carruselList') carruselList!: ElementRef<HTMLDivElement>;

  index: number = 0;
  counter: number = 0;
  productSection: number = 0;
  productWidth: number = 0;
  leftPosition: number = 0;
  lastPosition: number = 0;


  ngAfterViewInit(): void {

    /** la obtención de la longitud inmediatamente después de 
     * ngAfterViewInit no garantiza que los elementos estén disponibles 
     * debido a la naturaleza asíncrona de la renderización de la vista. */
    /**suscribirse a los cambios en la lista de QueryList utilizando 
     * changes para esperar a que los elementos estén listos.  */
    this.productos.changes.subscribe(() => {
      this.setUp();
    });

  }

  private setUp() {

    if (this.productos && this.productos.length > 0) {

      // Asignando valores
      this.index = this.productos.length - 1;
      this.productWidth = this.productos.first.nativeElement.offsetWidth;
      this.leftPosition = parseInt(this.carruselList.nativeElement.style.left);

      this.lastSection();
      
    }

  }

  lastSection() {

    // Total del ancho del carrusel view
    const screenView = this.carruselView.nativeElement.offsetWidth;

    // Total del ancho de la lista de productos
    const listWidth = this.productWidth * this.productos.length;

    //Cantidad de productos que caben en el view
    this.productSection = screenView / this.productWidth;

    // Posición del carrusel sin un panel
    this.lastPosition = -(listWidth - screenView);

  }

  moveLeft() {

    if (this.counter <= 0) {
      this.counter = this.index - this.productSection;
      this.leftPosition = this.lastPosition;
      console.log(this.lastPosition);
      return;
    }

    this.counter--;
    this.leftPosition += this.productWidth;
  }

  moveRight() {

    if (this.counter >= (this.index - this.productSection)) {
      this.counter = 0;
      this.leftPosition = 0;
    }

    this.counter++;
    this.leftPosition -= this.productWidth;
  }

  selectPoints() {
  }

}
