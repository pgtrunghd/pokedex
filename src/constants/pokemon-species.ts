type Color = {
  name: string;
  url: string;
};

type EggGroup = {
  name: string;
  url: string;
};

type EvolutionChain = {
  url: string;
};

type EvolvesFromSpecies = {
  name: string;
  url: string;
};

type FlavorTextEntry = {
  flavor_text: string;
  language: Language;
  version: Version;
};

type Language = {
  name: string;
  url: string;
};

type Genera = {
  genus: string;
  language: Language2;
};

type Language2 = {
  name: string;
  url: string;
};

type Generation = {
  name: string;
  url: string;
};

type GrowthRate = {
  name: string;
  url: string;
};

type Habitat = {
  name: string;
  url: string;
};

type Name = {
  language: Language3;
  name: string;
};

type Language3 = {
  name: string;
  url: string;
};

type PalParkEncounter = {
  area: Area;
  base_score: number;
  rate: number;
};

type Area = {
  name: string;
  url: string;
};

type PokedexNumber = {
  entry_number: number;
  pokedex: Pokedex;
};

type Pokedex = {
  name: string;
  url: string;
};

type Shape = {
  name: string;
  url: string;
};

type Variety = {
  is_default: boolean;
  pokemon: Pokemon;
};

type Pokemon = {
  name: string;
  url: string;
};
