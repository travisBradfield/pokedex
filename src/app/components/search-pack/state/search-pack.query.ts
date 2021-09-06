import { Injectable } from '@angular/core';
import { Query } from '@datorama/akita';

@Injectable({ providedIn: 'root' })
export class PokemonListQuery extends Query<any> {

  constructor(protected store: any) {
    super(store);
  }

}