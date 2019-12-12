import { Component, OnInit, Renderer2 } from '@angular/core';
import { EntitiesService } from '../Entities/entities.service';

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
  ) {}

  ngOnInit() {
    this.listItems = this.entitiesService.getFilteredEntities(this.searchTerm);
    this.renderer.selectRootElement('#myInput').focus();
  }
}
