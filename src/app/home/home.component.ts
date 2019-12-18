import { Component, OnInit } from '@angular/core';
import { EntitiesService } from '../entities/entities.service';
import { Entity } from '../entities/entity';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  connectedEntities: Entity[];

  constructor(private entitiesService: EntitiesService) {
  }

  ngOnInit() {
    this.getConnectedEntities();
  }

  getConnectedEntities(): void {
    this.connectedEntities = [];
    this.entitiesService.getConnectedEntities().subscribe(value => {
      this.connectedEntities.push(
        new Entity(value.id, value.name, value.description, value.isConnected),
      );
    });
  }

  disconnectEntity(id: number): void {
    this.entitiesService.getEntity(id).subscribe(
      next => {
        next.isConnected = false;
        this.entitiesService.putEntity(next).subscribe(
          val => {
          },
          response => {
          },
          () => {
            this.getConnectedEntities();
          },
        );
      },
    );
  }

}
