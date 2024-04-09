/*
  Returned by a search for SWAPI API people by page number
  GET https://swapi.tech/api/people/?page={n}
  View schema on swapi docs
*/
export interface SwapiCharactersResult {
  uid: number;
  name: string;
  url: string;
}
/*
  Returned by a request for a specific SWAPI API character
  GET https://www.swapi.tech/api/people/{uid}
  View schema on swapi docs
*/
export type Character = SwapiCharacter | {};
export interface SwapiCharacter {
  properties: SwapiCharacterProperties;
  description: string;
  _id: string;
  uid: number;
  __v: number;
}

export interface SwapiCharacterProperties {
  height: number;
  mass: number;
  hair_color: string;
  skin_color: string;
  eye_color: string;
  birth_year: string;
  gender: string;
  created: string;
  edited: string;
  name: string;
  homeworld: string;
  url: string;
}

export type Planet = SwapiPlanet | {};

export interface SwapiPlanet {
  properties: SwapiPlanetProperties;
  description: string;
  _id: string;
  uid: number;
  __v: number;
}

export interface SwapiPlanetProperties {
  diameter: number;
  rotation_period: number;
  orbital_period: number;
  gravity: string;
  population: number;
  climate: string;
  terrain: string;
  surface_water: number;
  created: string;
  edited: string;
  name: string;
  url: string;
}
