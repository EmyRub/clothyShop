import { Component, ElementRef, ViewChild, AfterViewInit, ViewChildren, QueryList, Input, OnInit, Renderer2 } from '@angular/core';
import { Product, Category } from 'src/app/interfaces/shop.interface';

@Component({
  selector: 'app-carrusel',
  templateUrl: './carrusel.component.html',
  styleUrls: ['./carrusel.component.scss']
})
export class CarruselComponent implements OnInit, AfterViewInit {

  @Input() type: string = 'product';
  @Input() products!: Product[];
  @Input() categories!: Category[];


  @ViewChildren('punto') points!: QueryList<ElementRef>;
  @ViewChildren('product') productos!: QueryList<ElementRef>;
  @ViewChild('carruselContent') carruselView!: ElementRef<HTMLDivElement>;
  @ViewChild('carruselList') carruselList!: ElementRef<HTMLDivElement>;

  index: number = 0;
  counter: number = 0;
  productSection: number = 0;
  productWidth: number = 0;
  leftPosition: number = 0;
  lastPosition: number = 0;

  cycle: number[] = [];
  pointsLength: number = 0;

  constructor(private renderer: Renderer2) { }

  ngOnInit(): void {
    this.timeSlider();
  }

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

      // Asignando points 
      this.pointsLength = Math.floor(this.productos.length / this.productSection);

      if (this.pointsLength >= 2) {
        for (let i = 1; i <= this.pointsLength; i++) {
          this.cycle.push(i);
        }
      }
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

  moveLeft(): void {

    if (this.counter <= 0) {
      this.counter = this.index - this.productSection;
      this.leftPosition = this.lastPosition;
      this.blockPoints();
      return;
    }

    this.counter--;
    this.leftPosition += this.productWidth;
    this.blockPoints();
  }

  moveRight(): void {

    if (this.counter > (this.index - this.productSection)) {
      this.counter = 0;
      this.leftPosition = 0;
      this.blockPoints();
      return;
    }

    this.counter++;
    this.leftPosition -= this.productWidth;

    this.blockPoints();

  }

  selectPoints(id: number) {

    this.counter = id * this.productSection;
    this.leftPosition = -(this.productWidth * this.counter);

    // Se ocupa el id del array para poder agregarlo a cualquier función si necesidad de tomar el event del click
    this.updatePoints(id)
  }

  blockPoints() {

    const operation = this.productSection % this.counter;
    console.log(operation);

    if (operation == 0) {
      this.updatePoints(this.counter + 1);
    }
  }

  updatePoints(id: number) {
    this.deleteActive();
    this.addActivo(id);

  }

  addActivo(id: number) {
    const selectedPoint = this.points.toArray()[id];

    if (selectedPoint) {
      const pointHtml = selectedPoint.nativeElement as HTMLElement;
      this.renderer.addClass(pointHtml, 'activo');
    }
  }

  deleteActive() {
    /*En Angular, cuando se trabaja con el DOM, especialmente al utilizar ElementRef, el tipo devuelto por 
        nativeElement no es directamente un HTMLElement, sino que es un tipo más genérico llamado any.*/
    this.points.forEach(point => {
      const pointId = point.nativeElement as HTMLElement;

      /**En resumen, mientras classList es una forma directa de manipular clases en el DOM, el uso de Renderer2 en Angular proporciona una capa de abstracción que garantiza la seguridad, portabilidad y optimización de rendimiento en la manipulación del DOM dentro del contexto del framework Angular. */
      if (pointId.classList.contains('activo')) {
        this.renderer.removeClass(pointId, 'activo');
      }
    });
  }

  private timeSlider(): void {
    setInterval(() => {
      this.moveRight();
    }, 6000);
  }

}
