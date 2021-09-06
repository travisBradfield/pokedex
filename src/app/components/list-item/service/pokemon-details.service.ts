import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { HttpService } from 'src/app/services/http.service';
import { PokemonDetailStore } from '../state/list-item.store';

@Injectable({
  providedIn: 'root'
})
export class PokemonDetailsService {

  constructor(
    private _http: HttpService,
    private _searchStore: PokemonDetailStore
  ) { }

  getDetails(url: string): Observable<any> {
    const detailStore = this._searchStore.getValue();
    const detailsInStore = detailStore.character;
    if (detailsInStore.length > 0) {
      return of(detailsInStore);
    }
    return this.updateStore(url);
  }

  private updateStore(url: string): Observable<any> {
    return this.fetchData(url).pipe(
      tap((resp) => {
        const timeNow = new Date();
        this._searchStore.update({
          character: resp,
          characterLastUpdated: timeNow.toString(),
        });
      })
    );
  }

  private fetchData(url: string): Observable<any> {
    return this._http
      // .runHttpCall('GET', '/pokemon', 'application/json')
      .getUrl(url)
      // .pipe(pluck('results'));
  }
}
