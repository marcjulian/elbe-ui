import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Service } from '@angular/core';
import { map } from 'rxjs';
import { mapGeocodingFeatureToAddress } from './elb-maptiler-feature-mapping';
import { injectMaptilerConfig } from './elb-maptiler.token';
import { GeocodingForwardQueryParams, GeocodingSearchResult } from './elb-maptiler.types';

@Service()
export class MaptilerService {
  private _config = injectMaptilerConfig();
  private _http = inject(HttpClient);

  forwardGeocode(query: string, params?: GeocodingForwardQueryParams) {
    const mergedParams: GeocodingForwardQueryParams = {
      ...this._config.defaultParams,
      ...params,
    };

    let httpParams = new HttpParams().set('key', this._config.apiKey);

    if (mergedParams.language) {
      httpParams = httpParams.set(
        'language',
        Array.isArray(mergedParams.language)
          ? mergedParams.language.join(',')
          : mergedParams.language,
      );
    }

    if (mergedParams.limit !== undefined) {
      httpParams = httpParams.set('limit', String(mergedParams.limit));
    }
    if (mergedParams.types) {
      httpParams = httpParams.set('types', mergedParams.types.join(','));
    }
    if (mergedParams.excludeTypes !== undefined) {
      httpParams = httpParams.set('excludeTypes', String(mergedParams.excludeTypes));
    }

    if (mergedParams.bbox) {
      httpParams = httpParams.set('bbox', mergedParams.bbox.join(','));
    }
    if (mergedParams.proximity) {
      httpParams = httpParams.set(
        'proximity',
        mergedParams.proximity === 'ip' ? mergedParams.proximity : mergedParams.proximity.join(','),
      );
    }
    if (mergedParams.country)
      httpParams = httpParams.set('country', mergedParams.country.join(','));

    if (mergedParams.fuzzyMatch !== undefined) {
      httpParams = httpParams.set('fuzzyMatch', mergedParams.fuzzyMatch ? 'true' : 'false');
    }
    if (mergedParams.autocomplete !== undefined) {
      httpParams = httpParams.set('autocomplete', mergedParams.autocomplete ? 'true' : 'false');
    }

    return this._http
      .get<GeocodingSearchResult>(
        `https://api.maptiler.com/geocoding/${encodeURIComponent(query)}.json`,
        { params: httpParams },
      )
      .pipe(map((result) => result.features.map(mapGeocodingFeatureToAddress)));
  }
}
