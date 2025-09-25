interface PokemonCardType {
  name: string;
  image: string;
  types: string[];
}

export interface PokemonListResponse {
  cards: PokemonCardType[];
  count: number;
}
