import { Component } from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { simpleGithub } from '@ng-icons/simple-icons';
import { HlmButtonImports } from '@spartan-ng/helm/button';
import { config } from '../../../config';
import { BaseLayout } from '../../../layouts/base.layout';
import { H2, H3 } from '../../../ui/heading';
import { Preview } from '../../../ui/preview';
import { AddressAutocompleteFormPreview } from './address-autocomplete-form.preview';
import { AddressAutocompleteMapPreview } from './address-autocomplete-map.preview';
import { AddressAutocompletePreview } from './address-autocomplete.preview';

@Component({
  selector: 'app-address-autocomplete-page',
  imports: [
    BaseLayout,
    Preview,
    NgIcon,
    HlmButtonImports,
    H2,
    H3,
    AddressAutocompletePreview,
    AddressAutocompleteMapPreview,
    AddressAutocompleteFormPreview,
  ],
  providers: [provideIcons({ simpleGithub })],
  template: `
    <elb-base-layout mainClass="pt-8">
      <div class="flex flex-col gap-2">
        <div class="flex justify-between">
          <h1 class="text-3xl font-semibold">Address Autocomplete</h1>
          <a
            hlmBtn
            variant="outline"
            size="sm"
            href="${config.github}/tree/main/libs/elbe/address-autocomplete/src/lib"
            target="_blank"
            rel="noopener noreferrer"
          >
            Open in
            <ng-icon name="simpleGithub" />
          </a>
        </div>
        <p class="text-muted-foreground max-w-md text-balance">
          Address Autocomplete component built with spartan/ui Autocomplete and Maptiler Forward
          Geocoding Api.
        </p>
      </div>

      <div elbPreview>
        <elb-address-autocomplete-preview />
      </div>

      <elb-h2 id="examples"> Examples </elb-h2>

      <elb-h3 id="map"> Map </elb-h3>
      <div elbPreview>
        <elb-address-autocomplete-map-preview />
      </div>

      <elb-h3 id="form"> Form </elb-h3>
      <div elbPreview>
        <elb-address-autocomplete-form-preview />
      </div>
    </elb-base-layout>
  `,
})
export class AddressAutocompletePage {}
