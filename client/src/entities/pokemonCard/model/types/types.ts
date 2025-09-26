interface PokemonCardType {
  name: string;
  image: string;
  types: string[];
}

export interface PokemonListResponse {
  cards: PokemonCardType[];
  count: number;
}

interface NamedApiResponse {
  name: string;
  url: string;
}

interface PokemonStat {
  baseStat: number;
  stat: NamedApiResponse;
}

interface PokemonAbility {
  isHidden: boolean;
  ability: NamedApiResponse;
}

interface PokemonSprites {
  frontDefault: string;
  backDefault: string;
}

export interface PokemonFullInfo {
  name: string;
  height: number;
  weight: number;
  stats: PokemonStat[];
  abilities: PokemonAbility[];
  sprites: PokemonSprites;
}
