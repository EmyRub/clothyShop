import { Component } from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent {

  active: boolean = false;

  menu() {
    this.active = !this.active;
    console.log(this.active);
  }

}
