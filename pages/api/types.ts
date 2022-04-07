export interface Thumbnail {
  path: string;
  extension: string;
}

export interface ApiEvent {
  name: string;
  resourceURI: string;
}

export interface ApiEvents {
  items: ApiEvent[];
}

export interface ApiCharacter {
  id: string;
  name: string;
  description: string;
  thumbnail: Thumbnail;
  events: ApiEvents;
  comics: ApiEvents;
  series: ApiEvents;
  stories: ApiEvents;
}

export interface ListCharacter {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
}

export interface SingleCharacter {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  events: string[];
  comics: string[];
  series: string[];
  stories: string[];
}
