import { Component, OnInit } from '@angular/core';
import { EntitiesService } from '../entities/entities.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  constructor(private entitiesService: EntitiesService) {}

  ngOnInit() {}
}
