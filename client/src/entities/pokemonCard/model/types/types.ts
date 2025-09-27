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

interface PokemonType {
  slot: number;
  type: NamedApiResponse;
}

interface PokemonStat {
  baseStat: number;
  stat: NamedApiResponse;
}

interface PokemonAbility {
  isHidden: boolean;
  ability: NamedApiResponse;
  description?: string;
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
  types: PokemonType[];
}
