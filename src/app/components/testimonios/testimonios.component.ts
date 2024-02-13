import { Component, ElementRef, ViewChild, AfterViewInit, ViewChildren, QueryList } from '@angular/core';

@Component({
  selector: 'app-testimonios',
  templateUrl: './testimonios.component.html',
  styleUrls: ['./testimonios.component.scss']
})
export class TestimoniosComponent implements AfterViewInit {

  isDragging: boolean = false;
  startX: number = 0;
  startScrollLeft: number = 0;
  cardWidth: number = 0;
  @ViewChild('carrusel') carrusel!: ElementRef<HTMLElement>;
  @ViewChildren('button') botones!: QueryList<HTMLButtonElement>;
  @ViewChildren('card') cards!: QueryList<ElementRef>

  ngAfterViewInit(): void {
    this.cardWidth = this.cards.first.nativeElement.offsetWidth;
  }

  dragStart(event: any) {

    this.isDragging = true;
    this.startX = event.pageX;
    this.startScrollLeft = this.carrusel.nativeElement.scrollLeft;
    this.carrusel.nativeElement.classList.add('dragging');
  }

  dragging(event: any) {
    if (!this.isDragging) return;
    //Actualiza la posición del carrusel en base al movimiento del cursor
    this.carrusel.nativeElement.scrollLeft = this.startScrollLeft - (event.pageX - this.startX);
  }

  dragStop() {
    this.isDragging = false;
    this.carrusel.nativeElement.classList.remove('dragging');
  }

  arrowBtn(btn: any) {
    this.carrusel.nativeElement.scrollLeft += btn.target.id === 'prev' ? -this.cardWidth : this.cardWidth;
  }

}
