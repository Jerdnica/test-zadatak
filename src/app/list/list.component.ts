import {Component, OnInit, Renderer2} from '@angular/core';
import { ENTITETI } from '../entiteti';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  entiteti = ENTITETI;
  listItems = ENTITETI.entiteti;
  searchTerm = '';
  selektovaniEntiteti = [];

  getEntitet(id): object {
    let i;
    for (i = 0; i < this.entiteti.entiteti.length; i++) {
      if (this.entiteti.entiteti[i].id === id) {
        return this.entiteti.entiteti[i];
      }
    }
  }
  entityConnected(id): boolean {
    let i;
    for (i = 0; i < this.entiteti.konektovani.length; i++ ) {
      if (this.entiteti.konektovani[i].id === id) {
        console.log('naso');
        return true;
      }
    }
    return false;
  }
  connect(): void {
    let i = 0;
    for (i = 0; i < this.selektovaniEntiteti.length; i++) {
      const ent = this.getEntitet(this.selektovaniEntiteti[i]);
      this.entiteti.konektovani.push(ent);
    }
    console.log(this.entiteti.konektovani);
  }
  filter(): void {
    this.listItems = this.entiteti.entiteti.filter(function(elem) {
      const term = this.searchTerm.toUpperCase();
      return elem.name.toUpperCase().indexOf(term) >= 0 && this.entityConnected(elem.id) === false;
    }, this);
  }
  constructor(public renderer: Renderer2) { }

  ngOnInit() {
    this.filter();
    this.renderer.selectRootElement('#myInput').focus();
  }

}
