import { ApiCharacter, ApiEvent, ListCharacter, SingleCharacter } from "./types";

export const mapCharacters = ({
  id,
  name,
  description,
  thumbnail,
}: ApiCharacter): ListCharacter => ({
  id,
  name,
  description,
  imageUrl: `${thumbnail.path}/portrait_xlarge.${thumbnail.extension}`,
})

const mapEvent = (event: ApiEvent): string => event.name;

export const mapCharacter = ({
  id,
  name,
  description,
  thumbnail,
  events,
  comics,
  series,
  stories,
}: ApiCharacter): SingleCharacter => ({
  id,
  name,
  description,
  imageUrl: `${thumbnail.path}/portrait_uncanny.${thumbnail.extension}`,
  events: events.items.map(mapEvent),
  comics: comics.items.map(mapEvent),
  series: series.items.map(mapEvent),
  stories: stories.items.map(mapEvent),
})
