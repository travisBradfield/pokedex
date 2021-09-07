import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map, pluck, tap } from 'rxjs/operators';
import { HttpService } from 'src/app/services/http/http.service';
import { PokemonListInterface } from 'src/assets/models';
import { PokemonListStore } from '../state/search-pack.store';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  // Complete object returned by the listing.
  public pokemonSearchResults: PokemonListInterface;

  // Saved characters
  favourites: any[];

  // Toggle between favourites and the listing.
  showFavourites: boolean = false;

  constructor(
    private _http: HttpService,
    private _searchStore: PokemonListStore,
  ) { }

  public getFirstTwenty(): Observable<PokemonListInterface> {
    const pokemonStore = this._searchStore.getValue();
    const pokemonInStore = pokemonStore.pokemon;
    if (pokemonInStore.length > 0) {
      return of(pokemonInStore);
    }
    return this.updateStore();
  }

  private updateStore(): Observable<PokemonListInterface> {
    return this.fetchData().pipe(
      tap((resp) => {
        const timeNow = new Date();
        this._searchStore.update({
          pokemon: resp,
          pokemonLastUpdated: timeNow.toString(),
        });
      })
    );
  }

  private fetchData(): Observable<PokemonListInterface> {
    return this._http
      .runHttpCall('GET', '/pokemon', 'application/json')
      .pipe(map(res => {
        for (let item of res.results) {
          item.hidden = false;
        }
        return res;
      }));
  }

  getPaginated(url: string) {
    this._http.getUrl(url).subscribe(data => {
      this.pokemonSearchResults = data;
    }, err => {
      console.log('Error getting next page: ', err);
    })
  }

  findCharacterByName(name: string) {
    return this._http.runHttpCall('GET', `/pokemon/${name}`, 'application/json')
  }
}


