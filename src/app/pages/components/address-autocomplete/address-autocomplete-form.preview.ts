import { Component, signal } from '@angular/core';
import { form, FormField, FormRoot, required } from '@angular/forms/signals';
import { Address, ElbAddressAutocompleteImports } from '@elbe/ui/address-autocomplete';
import { HlmButtonImports } from '@spartan-ng/helm/button';
import { HlmFieldImports } from '@spartan-ng/helm/field';

@Component({
  selector: 'elb-address-autocomplete-form-preview',
  imports: [FormRoot, FormField, HlmButtonImports, HlmFieldImports, ElbAddressAutocompleteImports],
  host: { class: 'w-full sm:max-w-xs' },
  template: `
    <form [formRoot]="form">
      <hlm-field-group>
        <hlm-field>
          <label hlmFieldLabel for="address">Address</label>
          <elb-address-autocomplete inputId="address" [formField]="form.address" />
          @for (error of form.address().errors(); track error.kind) {
            <hlm-field-error [validator]="error.kind">
              {{ error.message }}
            </hlm-field-error>
          }
        </hlm-field>
        <hlm-field>
          <button hlmBtn type="submit">Submit</button>
        </hlm-field>
      </hlm-field-group>
    </form>
  `,
})
export class AddressAutocompleteFormPreview {
  private readonly _model = signal<{ address: Address | null }>({ address: null });

  form = form(
    this._model,
    (schema) => ({
      address: required(schema.address, { message: 'Address is required' }),
    }),
    {
      submission: {
        action: async () => {
          const model = this._model();
          console.log('You submitted the following values:', JSON.stringify(model, null, 2));
        },
      },
    },
  );
}
