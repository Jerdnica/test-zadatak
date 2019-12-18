import { Component, OnInit, Renderer2 } from '@angular/core';
import { EntitiesService } from '../entities/entities.service';
import { Entity } from '../entities/entity';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit {
  searchTerm = '';
  listItems = [];
  selectedEntities = [];
  constructor(
    public renderer: Renderer2,
    private entitiesService: EntitiesService
  ) {
    this.getAvailableEntities();
  }

  getAvailableEntities(): void {
    this.listItems = [];
    this.entitiesService
      .getFilteredEntities(this.searchTerm.toUpperCase())
      .subscribe(value => {
        this.listItems.push(
          new Entity(value.id, value.name, value.description, value.isConnected)
        );
      });
  }
  connectEntities() {
    for (const entity of this.selectedEntities) {
      this.entitiesService.getEntity(entity).subscribe(
        next => {
          next.isConnected = true;
          this.entitiesService.putEntity(next).subscribe();
        }
      );
    }
  }
  ngOnInit() {
    this.renderer.selectRootElement('#myInput').focus();
  }
}
