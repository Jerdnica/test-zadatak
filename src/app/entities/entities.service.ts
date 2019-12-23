import { Injectable } from '@angular/core';
import { Entity } from './entity';
import { map, mergeMap, filter } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { from, Observable } from 'rxjs';

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
      filter(entity => entity.id === id),
    );
  }

  public getFilteredEntities(searchTerm: string): Observable<Entity> {
    return this.getEntities().pipe(
      filter(
        entity =>
          entity.isConnected === false &&
          entity.name.toUpperCase().indexOf(searchTerm) >= 0,
      ),
    );
  }

  public getConnectedEntities(): Observable<Entity> {
    return this.getEntities().pipe(
      filter(entity => entity.isConnected === true),
    );
  }

  connectEntities(selectedEntities: number[]): Observable<Entity> {
    // its possible that there is a better solution
    let entitiesToConnectCounter = selectedEntities.length;
    return new Observable(observer => {
      this.getEntities()
        .pipe(
          filter(entity => selectedEntities.includes(entity.id)),
        )
        .subscribe(
          next => {
            next.isConnected = true;
            this.putEntity(next).subscribe(
              () => {
              },
              () => {
              },
              () => {
                entitiesToConnectCounter--;
                observer.next(next);
                if(entitiesToConnectCounter === 0) {
                  console.log('complete');
                  observer.complete();
                }
              },
            );
          }
        );
    });
  }

  public putEntity(entity: Entity): Observable<any> {
    return this.http.put(this.url + '/entities/' + entity.id, entity);
  }
}
