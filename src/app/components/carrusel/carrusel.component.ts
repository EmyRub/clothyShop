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


  @ViewChildren('product') producto!: QueryList<ElementRef>
  @ViewChild('carruselList') list!: ElementRef<HTMLDivElement>;


  productWidth: number = 0;
  leftPosition: number = 0;
  widthSection: number = 0;


  ngAfterViewInit(): void {

    /** la obtención de la longitud inmediatamente después de 
     * ngAfterViewInit no garantiza que los elementos estén disponibles 
     * debido a la naturaleza asíncrona de la renderización de la vista. */
    /**suscribirse a los cambios en la lista de QueryList utilizando 
     * changes para esperar a que los elementos estén listos.  */
    this.producto.changes.subscribe(() => {
      this.setUp();
    });

  }

  private setUp() {

    if (this.producto && this.producto.length > 0) {

      this.productWidth = this.producto.first.nativeElement.offsetWidth;
      this.leftPosition = parseInt(this.list.nativeElement.style.left);

      this.calLastSection();
    }

  }

  moveLeft() {
    if (this.leftPosition <= 0 && this.leftPosition != this.widthSection) {
      this.leftPosition = this.widthSection;
      return;
    }
    this.leftPosition += this.productWidth;
  }

  moveRight() {
    if (this.widthSection > this.leftPosition) {
      this.leftPosition = 0;
      return;
    }
    this.leftPosition -= this.productWidth;
  }

  selectPoints() {
  }

  calLastSection() {
    // Se inicializan valores
    const element = this.producto.first.nativeElement;
    const style = window.getComputedStyle(element);
    const flexBasis = style.getPropertyValue('flex-basis');

    // Se hacen cálculos
    const lastSection = 100 / parseInt(flexBasis);
    const sectionContent = lastSection * this.productWidth;
    const fullContent = (this.producto.length - 1) * this.productWidth;

    this.widthSection = (sectionContent - fullContent);

  }

}
