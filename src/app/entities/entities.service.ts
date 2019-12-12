import { Injectable } from '@angular/core';
import { Entity } from './entity';

@Injectable({
  providedIn: 'root',
})
export class EntitiesService {
  public list: Array<Entity>;
  public connected: Array<Entity>;

  constructor() {
    this.list = [
      { id: 1, name: 'Arrivals', description: 'BPM' },
      { id: 2, name: 'Car Wash', description: 'BPM' },
      { id: 3, name: 'Maintenance', description: 'Project' },
      { id: 4, name: 'Customer Payment', description: 'BPM' },
      { id: 5, name: 'Arrivals Database', description: 'Database' },
      { id: 6, name: 'Calculator', description: 'Application' },
      { id: 7, name: 'California', description: 'Server' },
    ];
    this.connected = [];
  }

  disconnect(id: number): void {
    let i;
    for (i = 0; i < this.connected.length; i++) {
      if (this.connected[i].id === id) {
        this.connected.splice(i, 1);
      }
    }
  }
  getEntity(id: number): Entity {
    let i;
    for (i = 0; i < this.list.length; i++) {
      if (this.list[i].id === id) {
        return this.list[i];
      }
    }
  }
  getFilteredEntities(searchTerm): Array<Entity> {
    return this.list.filter(function(elem) {
      const term = searchTerm.toUpperCase();
      return (
        this.entityConnected(elem.id) === false &&
        elem.name.toUpperCase().indexOf(term) >= 0
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
    let i;
    for (i = 0; i < selectedEntities.length; i++) {
      const ent = this.getEntity(selectedEntities[i]);
      this.connected.push(ent);
    }
  }
}
