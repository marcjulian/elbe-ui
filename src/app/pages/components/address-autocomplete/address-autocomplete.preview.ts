import { Component } from '@angular/core';
import { ElbAddressAutocompleteImports } from '@elbe/ui/address-autocomplete';

@Component({
  selector: 'elb-address-autocomplete-preview',
  imports: [ElbAddressAutocompleteImports],
  template: `<elb-address-autocomplete class="block w-80" />`,
})
export class AddressAutocompletePreview {}
