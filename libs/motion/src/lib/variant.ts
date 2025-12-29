import type { VariantLabels } from 'motion';
import type { VariantsType, VariantType } from './types';

export function resolveVariant(
  definition: VariantLabels | VariantType | undefined,
  variants: VariantsType | undefined,
): VariantType | undefined {
  if (!definition) {
    return undefined;
  }

  if (Array.isArray(definition)) {
    return variants
      ? definition.reduce((acc, key) => ({ ...acc, ...variants[key] }), {} as VariantType)
      : {};
  }

  if (typeof definition === 'string') {
    return variants ? variants[definition] : {};
  }
  return definition;
}
