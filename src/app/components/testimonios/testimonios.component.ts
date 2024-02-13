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
  carPerView: number = 0;
  carruselChildren!: any;
  timeoutId: any = 0;
  @ViewChild('carrusel') carrusel!: ElementRef<HTMLElement>;
  @ViewChild('container') container!: ElementRef<HTMLElement>;
  @ViewChildren('button') botones!: QueryList<HTMLButtonElement>;
  @ViewChildren('card') cards!: QueryList<ElementRef>

  ngAfterViewInit(): void {

    this.setUp();
    this.autoPlay();

  }

  setUp() {
    if (this.cards && this.cards.length > 0) {
      //Tamaño del primer card
      this.cardWidth = this.cards.first.nativeElement.offsetWidth;
      // Get the number of cards that can fit in the carousel at once
      this.carPerView = Math.round(this.carrusel.nativeElement.offsetWidth / this.cardWidth);



      this.carruselChildren = this.carrusel.nativeElement.children;
      const childrenArray = Array.from(this.carruselChildren) as HTMLElement[];

      // Insert copies of the last few cards to beginning of carousel for infinite scrolling
      childrenArray.slice(-this.carPerView).reverse().forEach((card: HTMLElement) => {
        this.carrusel.nativeElement.insertAdjacentHTML('afterbegin', card.outerHTML);
      });

      // Insert copies of the last few cards to beginning of carousel for infinite scrolling
      childrenArray.slice(0, this.carPerView).forEach((card: HTMLElement) => {
        this.carrusel.nativeElement.insertAdjacentHTML('beforeend', card.outerHTML);
      });
    }
  }

  autoPlay() {
    if (window.innerWidth < 800) return; // Don't play on mobile devices
    // Autoplay the carousel after every 2500 ms
    this.timeoutId = setTimeout(() => this.carrusel.nativeElement.scrollLeft += this.cardWidth, 2500)
  }

  restartAutoplay(){
    clearTimeout(this.timeoutId);
  }

  infiniteScroll() {
    // If the carousel is at the beginning, scroll to the end
    if (this.carrusel.nativeElement.scrollLeft === 0) {
      this.carrusel.nativeElement.classList.add('no-transition');
      this.carrusel.nativeElement.scrollLeft = this.carrusel.nativeElement.scrollWidth - (2 * this.carrusel.nativeElement.offsetWidth)
      this.carrusel.nativeElement.classList.remove('no-transition');

      // If the carousel is at the end, scroll to the beginning
    } else if (Math.ceil(this.carrusel.nativeElement.scrollLeft) === this.carrusel.nativeElement.scrollWidth - this.carrusel.nativeElement.offsetWidth) {
      this.carrusel.nativeElement.classList.add('no-transition');
      this.carrusel.nativeElement.scrollLeft = this.carrusel.nativeElement.offsetWidth;
      this.carrusel.nativeElement.classList.remove('no-transition');
    }

    clearTimeout(this.timeoutId);
    //Clear existing timeout & start autoplay if mouse is not hovering over carousel
    if (!this.container.nativeElement.matches(':hover')) this.autoPlay();
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
