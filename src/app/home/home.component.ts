import { Component, OnInit } from '@angular/core';
import { ENTITETI } from '../entiteti';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  konektovaniEntiteti = ENTITETI.konektovani;

  delete(id): void {
    let i;
    for (i = 0; i < this.konektovaniEntiteti.length; i++) {
      if (this.konektovaniEntiteti[i].id === id) {
        this.konektovaniEntiteti.splice(i, 1);
      }
    }
  }
  constructor() {}

  ngOnInit() {}
}
