import { Component, ElementRef, ViewChildren, OnInit, AfterViewInit, QueryList, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.scss']
})
export class SliderComponent implements OnInit, AfterViewInit {

  sliderLength: number = 1;
  sliderWidth: number = 0;
  fullContent: number = 0;
  counter: number = 0;
  operacion: number = 0;

  //Angular proporciona ElementRef para interactuar con elementos del DOM directamente
  @ViewChildren('slider') sliders!: QueryList<ElementRef>;
  @ViewChildren('punto') points!: QueryList<ElementRef>;


  constructor(private renderer: Renderer2) { }

  ngOnInit(): void {
    this.timeSlider();
  }

  ngAfterViewInit(): void {
    this.actualizarPropiedades();
  }

  private actualizarPropiedades(): void {
    this.sliderLength = this.sliders.length;

    // Evitar divisiones por cero
    if (this.sliderLength !== 0) {
      this.sliderWidth = 100 / this.sliderLength;
    }

    // Calcula el ancho total del contenedor del carrusel
    this.fullContent = 100 * this.sliderLength;
  }

  moveRight(): void {

    if (this.counter >= this.sliderLength - 1) {
      this.counter = 0;
      this.operacion = 0;
      this.updateSlider(this.counter);
      return;
    }

    this.counter++;
    this.operacion += -this.sliderWidth;
    this.updateSlider(this.counter);

  }

  moveLeft(): void {

    this.counter--;

    if (this.counter < 0) {
      this.counter = this.sliderLength - 1;
      this.operacion = this.sliderWidth * -(this.sliderLength - 1);
      this.updateSlider(this.counter);
      return;
    }

    this.operacion -= -this.sliderWidth;
    this.updateSlider(this.counter);

  }

  selectPoints(element: HTMLElement): void {

    //Angular proporciona ElementRef para interactuar con elementos del DOM directamente
    this.counter = parseInt(element.getAttribute('data-id') || '0', 10);
    this.operacion = this.sliderWidth * -this.counter;
    this.updateSlider(this.counter);
  }


  private updateSlider(id: number): void {

    this.removeActiveClass();
    this.addActiveClass(id);

  }

  private addActiveClass(id: number): void {

    // Convertir la QueryList a un array y acceder al primer elemento
    const selectPoint = this.points.toArray()[id];

    if (selectPoint) {
      const elementoHTML = selectPoint.nativeElement as HTMLElement;
      //Se modificó del .classList
      this.renderer.addClass(elementoHTML, 'activo');
    }
  }

  private removeActiveClass() {
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
