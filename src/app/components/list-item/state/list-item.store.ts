import { Injectable } from '@angular/core';
import { Store, StoreConfig } from '@datorama/akita';

export interface PokemonDetailState {
    character: any;
    characterLastUpdated: string;
}

export function createInitialState(): PokemonDetailState {
    return {
        character: {},
        characterLastUpdated: ''
    };
}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'details' })
export class PokemonDetailStore extends Store<PokemonDetailState> {
    constructor() {
        super(createInitialState());
    }
}