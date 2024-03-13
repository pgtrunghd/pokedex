type Chain = {
  evolution_details: any[];
  evolves_to: EvolvesTo[];
  is_baby: boolean;
  species: Species3;
};

type EvolvesTo = {
  evolution_details: EvolutionDetail[];
  evolves_to: EvolvesTo2[];
  is_baby: boolean;
  species: Species2;
};

type EvolutionDetail = {
  gender: any;
  held_item: any;
  item: any;
  known_move: any;
  known_move_type: any;
  location: any;
  min_affection: any;
  min_beauty: any;
  min_happiness: any;
  min_level: number;
  needs_overworld_rain: boolean;
  party_species: any;
  party_type: any;
  relative_physical_stats: any;
  time_of_day: string;
  trade_species: any;
  trigger: Trigger;
  turn_upside_down: boolean;
};

type Trigger = {
  name: string;
  url: string;
};

type EvolvesTo2 = {
  evolution_details: EvolutionDetail2[];
  evolves_to: any[];
  is_baby: boolean;
  species: Species;
};

type EvolutionDetail2 = {
  gender: any;
  held_item: any;
  item: any;
  known_move: any;
  known_move_type: any;
  location: any;
  min_affection: any;
  min_beauty: any;
  min_happiness: any;
  min_level: number;
  needs_overworld_rain: boolean;
  party_species: any;
  party_type: any;
  relative_physical_stats: any;
  time_of_day: string;
  trade_species: any;
  trigger: Trigger2;
  turn_upside_down: boolean;
};

type Trigger2 = {
  name: string;
  url: string;
};

type Species2 = {
  name: string;
  url: string;
};

type Species3 = {
  name: string;
  url: string;
};
