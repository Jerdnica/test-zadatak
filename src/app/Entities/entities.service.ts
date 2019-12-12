import { Injectable } from '@angular/core';
import { Entities } from './entities';

@Injectable({
  providedIn: 'root',
})
export class EntitiesService {
  connected = Entities.connected;
  list = Entities.list;

  disconnect(id: number): void {
    let i;
    for (i = 0; i < this.connected.length; i++) {
      if (this.connected[i].id === id) {
        this.connected.splice(i, 1);
      }
    }
  }
  getEntity(id: number): object {
    let i;
    for (i = 0; i < this.list.length; i++) {
      if (this.list[i].id === id) {
        return this.list[i];
      }
    }
  }
  getFilteredEntities(searchTerm) {
    return this.list.filter(function(elem) {
      const term = searchTerm.toUpperCase();
      return (
        this.entityConnected(elem.id) === false && elem.name.toUpperCase().indexOf(term) >= 0
      );
    }, this);
  }
  entityConnected(id: number): boolean {
    let i;
    for (i = 0; i < this.connected.length; i++) {
      if (this.connected[i].id === id) {
        return true;
      }
    }
    return false;
  }
  connect(selectedEntities): void {
    let i = 0;
    for (i = 0; i < selectedEntities.length; i++) {
      const ent = this.getEntity(selectedEntities[i]);
      this.connected.push(ent);
    }
  }

  constructor() {}
}
