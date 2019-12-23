import { Component, OnInit, Renderer2 } from '@angular/core';
import { EntitiesService } from '../entities/entities.service';
import { Entity } from '../entities/entity';
import { Router } from '@angular/router';

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
    private entitiesService: EntitiesService,
    private router: Router,
  ) {
    this.getAvailableEntities();
  }

  ngOnInit() {
    this.renderer.selectRootElement('#myInput').focus();
  }

  getAvailableEntities(): void {
    this.listItems = [];
    this.entitiesService
      .getFilteredEntities(this.searchTerm.toUpperCase())
      .subscribe(value => {
        this.listItems.push(
          new Entity(value.id, value.name, value.description, value.isConnected),
        );
      });
  }

  connectEntities() {
    this.entitiesService.connectEntities(this.selectedEntities).subscribe(
      next => {
      },
      () => {
      },
      () => {
        this.router.navigateByUrl('/home');
      },
    );
  }
}
