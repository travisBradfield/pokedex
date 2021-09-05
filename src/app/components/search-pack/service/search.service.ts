import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map, pluck, tap } from 'rxjs/operators';
import { HttpService } from 'src/app/services/http.service';
import { PokemonListStore } from '../state/search-pack.store';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  constructor(
    private _http: HttpService,
    private _searchStore: PokemonListStore,
  ) { }

  public getFirstTwenty(): Observable<any[]> {
    const pokemonStore = this._searchStore.getValue();
    const calendarsInStore = pokemonStore.pokemon;
    if (calendarsInStore.length > 0) {
      return of(calendarsInStore);
    }
    return this.updateStore();
  }

  private updateStore(): Observable<any[]> {
    return this.fetchData().pipe(
      tap((resp) => {
        const timeNow = new Date();
        this._searchStore.update({
          calendars: resp,
          calendarsLastUpdated: timeNow.toString(),
        });
      })
    );
  }

  private fetchData(): Observable<any[]> {
    return this._http
      .runHttpCall('GET', '/pokemon', 'application/json')
      .pipe(pluck('results'));
  }
}


