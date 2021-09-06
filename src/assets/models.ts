export interface PokemonInterface {

}

export interface PokemonListInterface {
    count: number;
    next: string;
    previous: string;
    results: any[];
}

export interface CharacterSource {
    name: string;
    url: string;
}