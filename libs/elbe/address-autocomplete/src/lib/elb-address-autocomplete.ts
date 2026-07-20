import {
  Component,
  computed,
  debounced,
  effect,
  inject,
  input,
  linkedSignal,
  model,
  output,
  resource,
} from '@angular/core';
import { FormValueControl } from '@angular/forms/signals';
import { HlmAutocompleteImports } from '@spartan-ng/helm/autocomplete';
import { HlmSpinnerImports } from '@spartan-ng/helm/spinner';
import { lastValueFrom } from 'rxjs';
import { GeocodingForwardQueryParams, MaptilerService } from './maptiler';
import { Address, mapAddress } from './maptiler/elb-maptiler-feature-mapping';

@Component({
  selector: 'elb-address-autocomplete',
  imports: [HlmAutocompleteImports, HlmSpinnerImports],
  template: `
    <hlm-autocomplete
      [(value)]="value"
      [disabled]="disabled()"
      [search]="_searchDebounced.value()"
      [itemToString]="addressToString"
      (searchChange)="_search.set($event)"
      (closed)="touch.emit()"
    >
      <hlm-autocomplete-input
        [inputId]="inputId()"
        class="bg-background dark:bg-background"
        [placeholder]="placeholder()"
        showClear
      />
      <hlm-autocomplete-content *hlmAutocompletePortal>
        @if (_showStatus()) {
          <hlm-autocomplete-status>
            @if (addressQuery.isLoading()) {
              <hlm-spinner /> {{ loadingText() }}
            } @else if (_searchDebounced.value().length === 0) {
              {{ emptySearchText() }}
            } @else {
              {{ noResultsText() }}
            }
          </hlm-autocomplete-status>
        }

        <div hlmAutocompleteList>
          @for (option of addressQuery.value(); track $index) {
            <hlm-autocomplete-item [value]="option">
              <div>
                <span class="font-medium">
                  {{ option.placeNameShort }}
                </span>
                @if (option.placeNameSuffix) {
                  <span class="text-muted-foreground"> {{ ' ' }}{{ option.placeNameSuffix }} </span>
                }
              </div>
            </hlm-autocomplete-item>
          }
        </div>
      </hlm-autocomplete-content>
    </hlm-autocomplete>
  `,
})
export class ElbAddressAutocomplete implements FormValueControl<Address | null> {
  private static _id = 0;
  private readonly _mapTiler = inject(MaptilerService);

  protected readonly addressQuery = resource({
    params: () => ({
      search: this._searchDebounced.value(),
      geocodingParams: this.geocodingParams(),
    }),
    loader: async ({ params }) => {
      if (!params.search) {
        return [];
      }

      return lastValueFrom(this._mapTiler.forwardGeocode(params.search, params.geocodingParams));
    },
  });

  protected readonly _showStatus = computed(
    () =>
      this.addressQuery.isLoading() ||
      this._searchDebounced.value().length === 0 ||
      this.addressQuery.value()?.length === 0,
  );

  public readonly inputId = input<string>(
    `elb-address-autocomplete-${ElbAddressAutocomplete._id++}`,
  );

  /** The placeholder text for the input field. */
  public readonly placeholder = input<string>('Search for a place');

  /** Text shown while addresses are loading. */
  public readonly loadingText = input<string>('Loading');

  /** Text shown when the search query is empty. */
  public readonly emptySearchText = input<string>('Type to search for places.');

  /** Text shown when no matching places are found. */
  public readonly noResultsText = input<string>('No matching places found.');

  /** Geocoding query parameters that override the defaults from the Maptiler config. */
  public readonly geocodingParams = input<GeocodingForwardQueryParams>();

  public readonly value = model<Address | null>(null);

  public readonly disabled = input<boolean>(false);

  public readonly search = input<string>();
  protected readonly _search = linkedSignal(() => this.search() || '');
  protected readonly _searchDebounced = debounced(this._search, 300);

  public readonly searchChange = output<string>();

  public readonly touch = output<void>();

  protected readonly addressToString = (address: Address) => mapAddress(address);

  constructor() {
    effect(() => {
      this.searchChange.emit(this._searchDebounced.value());
    });
  }
}
