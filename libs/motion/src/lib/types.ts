import type { DOMKeyframesDefinition } from 'motion';

export interface VariantType extends DOMKeyframesDefinition {}

export type VariantsType = Record<string, VariantType>;
