import type { BBox, Geometry, Position } from 'geojson';

export type GeocodingPlaceType =
  | 'continental_marine'
  | 'country'
  | 'major_landform'
  | 'region'
  | 'subregion'
  | 'county'
  | 'joint_municipality'
  | 'joint_submunicipality'
  | 'municipality'
  | 'municipal_district'
  | 'locality'
  | 'neighbourhood'
  | 'place'
  | 'postal_code'
  | 'address'
  | 'road'
  | 'poi';

export type FeatureKind =
  'road' | 'road_relation' | 'admin_area' | 'place' | 'street' | 'virtual_street';

type FeatureBase = {
  /**
   * Unique feature ID
   */
  id: string;

  /**
   * Localized feature name
   */
  text: string;

  /**
   * Query's primary ISO 639-1 language code
   */
  language?: string;

  /**
   * A string analogous to the `text` field that matches the query in the requested language.
   * This field is only returned when multiple languages are requested using the `language` parameter, and will be present for each requested language.
   */
  [text: `text_${string}`]: string;

  /**
   * A ISO 639-1 query's fallback language code.
   * This field is only returned when multiple languages are requested using the `language` parameter, and will be present for each requested language.
   */
  [language: `language_${string}`]: string;

  type: 'Feature';
};

export type FeatureProperties = {
  ref: string;
  country_code: string;
  /**
   * (experimental) Kind of the feature
   */
  kind?: FeatureKind;

  /**
   * (experimental) Value of place=* tag from OpenStreetMap feature if kind=place
   */
  'osm:place_type'?: string;

  /**
   * (experimental) Feature tags from OpenStreetMap. Only available for `poi` type.
   */
  'osm:tags'?: Record<string, string>;

  /**
   * Array of POI categories. Only available for `poi` type.
   */
  categories?: string[];

  /**
   * Wikidata identifier.
   */
  wikidata?: string;
};

export type FeatureHierarchy = FeatureProperties & FeatureBase;

export type GeocodingFeature = FeatureBase & {
  properties: FeatureProperties;
  geometry: Geometry;
  bbox: BBox;
  center: Position;
  place_name: string;
  place_type: GeocodingPlaceType[];
  place_type_name: string[];
  relevance: number;
  /**
   * Feature hierarchy
   */
  context?: Array<FeatureHierarchy>;
  /**
   * Address number, if applicable
   */
  address?: string;
};

export interface GeocodingSearchResult {
  type: 'FeatureCollection';
  features: GeocodingFeature[];
  query: string[];
  attribution: string;
}

/**
 * https://docs.maptiler.com/cloud/api/geocoding/#search-by-name-forward
 */
export interface GeocodingForwardQueryParams {
  /**
   * Prefer results in specific language. It’s possible to specify multiple values.
   */
  language?: string | Array<string>;

  /**
   * Maximum number of results to show. Must be between 1 and 10.
   * For reverse geocoding with multiple `types` this must not be set or must be set to 1.
   * Default is 5 for forward and 1 for reverse geocoding.
   */
  limit?: number;

  /**
   * Features of specified types to query.
   * If not specified, default configuration of API is used (see https://docs.maptiler.com/cloud/api/geocoding/#PlaceTypeValues for the list).
   * In case of reverse geocoding if just a single type is specified, then multiple nearby features of the single type can be returned,
   * otherwise single feature for every specified type (or default types) can be returned.
   */
  types?: GeocodingPlaceType[];

  /**
   * Set to `true` to use all available feature types except those mentioned in `types`. Default value is `false` if `types` is specified.
   */
  excludeTypes?: boolean;

  /**
   * Only search for results in the specified area.
   */
  bbox?: BBox;

  /**
   * Prefer results close to a specific location.
   */
  proximity?: Position | 'ip';

  /**
   * Limit search to specific country/countries specified as list of Alpha-2 ISO 3166-1 codes.
   */
  country?: string[];

  /**
   * Set to `false` to disable fuzzy (typo-tolerant) search. Default is `true`.
   */
  fuzzyMatch?: boolean;

  /**
   * Set to `true` to use autocomplete, `false` to disable it. Default is `true`.
   */
  autocomplete?: boolean;
}
