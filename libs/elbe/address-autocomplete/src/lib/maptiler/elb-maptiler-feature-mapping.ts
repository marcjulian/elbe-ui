import { FeatureHierarchy, GeocodingFeature, GeocodingPlaceType } from './elb-maptiler.types';

export interface Address {
  placeName: string;
  lng: number;
  lat: number;
  countryCode: string;
  street: string | null;
  houseNumber: string | null;
  city: string;
  zipCode: string | null;
  bbox: number[];
  placeNameShort: string;
  placeNameSuffix?: string;
}

export const mapGeocodingFeatureToAddress = (feature: GeocodingFeature): Address => {
  const { place_name, center, properties, address } = feature;
  const zipCode = mapZipCode(feature);
  return {
    placeName: place_name,
    lng: center[0],
    lat: center[1],
    countryCode: properties.country_code,
    street: mapStreet(feature),
    city: mapCity(feature),
    zipCode: zipCode,
    houseNumber: address || null,
    bbox: feature.bbox,

    placeNameShort: place_name.replace(/,.*/, ''),
    placeNameSuffix: place_name.replace(/[^,]*,?\s*/, ''),
  };
};

const mapStreet = ({ place_type, context, text }: GeocodingFeature): string | null => {
  let street = findContext('address', context);

  if (place_type.includes('address')) {
    street = text;
  }

  return street || null;
};

const mapCity = ({ place_type, context, text }: GeocodingFeature): string => {
  const city = place_type.some((type) => ['municipality', 'county', 'region'].includes(type))
    ? text
    : findContext('municipality', context) ||
      findContext('county', context) ||
      findContext('region', context) ||
      text;

  if (place_type.includes('locality')) {
    return [text, city].filter(Boolean).join(', ');
  }

  return city;
};

const mapZipCode = ({ context, place_type, text }: GeocodingFeature): string | null => {
  if (place_type.includes('postal_code')) {
    return text;
  }

  return findContext('postal_code', context) || null;
};

const findContext = (match: GeocodingPlaceType, context?: FeatureHierarchy[]) => {
  return context?.find((c) => c.id.startsWith(match))?.text;
};

export function mapAddress({
  street,
  houseNumber,
  zipCode,
  city,
}: {
  street?: string | null;
  houseNumber?: string | null;
  zipCode: string | null;
  city: string;
}): string {
  const streetAndHouseNumber = [street, houseNumber].filter(Boolean).join(' ');
  const zipCodeAndCity = [zipCode, city].filter(Boolean).join(' ');

  return [streetAndHouseNumber, zipCodeAndCity].filter(Boolean).join(', ');
}
