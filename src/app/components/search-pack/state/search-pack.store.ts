import { Injectable } from '@angular/core';
import { Store, StoreConfig } from '@datorama/akita';

export interface PokemonListState {
    pokemon: any[];
    pokemonLastUpdated: string;
}

export function createInitialState(): PokemonListState {
    return {
        pokemon: [],
        pokemonLastUpdated: '',
    };
}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'search' })
export class PokemonListStore extends Store<any> {
    constructor() {
        super(createInitialState());
    }
}