import { Injectable } from '@angular/core';
import { Entity } from './entity';
import { map, mergeMap, filter } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EntitiesService {
  private url = 'http://localhost:3000';

  constructor(private http: HttpClient) {
  }

  public getEntities(): Observable<Entity> {
    return this.http.get<Entity[]>(this.url + '/entities').pipe(
      mergeMap(data => {
        return data;
      }),
    );
  }

  public getEntity(id: number): Observable<Entity> {
    return this.getEntities().pipe(
      map(entities => entities),
      filter(entity => entity.id === id),
    );
  }

  public getFilteredEntities(searchTerm: string): Observable<Entity> {
    return this.getEntities().pipe(
      map(entities => entities),
      filter(
        entity =>
          entity.isConnected === false &&
          entity.name.toUpperCase().indexOf(searchTerm) >= 0,
      ),
    );
  }

  public getConnectedEntities(): Observable<Entity> {
    return this.getEntities().pipe(
      map(entities => entities),
      filter(entity => entity.isConnected === true),
    );
  }

  entitiesForConnecting(selectedEntities: number[]): Observable<Entity> {
    return this.getEntities().pipe(
      map(entities => entities),
      filter(entity => selectedEntities.includes(entity.id)),
    );
  }

  public putEntity(entity: Entity): Observable<any> {
    return this.http.put(this.url + '/entities/' + entity.id, entity);
  }
}
