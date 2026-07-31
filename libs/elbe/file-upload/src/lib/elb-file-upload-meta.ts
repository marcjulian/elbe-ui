import { NumberInput } from '@angular/cdk/coercion';
import { Directive, computed, inject, input, numberAttribute } from '@angular/core';
import { classes } from '@spartan-ng/helm/utils';
import { ElbFileUpload } from './elb-file-upload';

export type ElbFileUploadMetaField = 'name' | 'type' | 'size';

@Directive({
  selector: '[elbFileUploadMeta]',
  host: {
    'data-slot': 'file-upload-meta',
    '[textContent]': 'value()',
  },
})
export class ElbFileUploadMeta {
  private readonly _fileUpload = inject(ElbFileUpload);

  public readonly index = input<number, NumberInput>(0, { transform: numberAttribute });
  public readonly field = input<ElbFileUploadMetaField>('name');

  protected readonly value = computed(() => {
    const file = this._fileUpload.value()?.[this.index()] ?? null;
    if (!file) return null;
    return this._formatField(file, this.field());
  });

  constructor() {
    classes(() => 'text-muted-foreground max-w-full truncate text-xs');
  }

  private _formatField(file: File, field: ElbFileUploadMetaField): string | null {
    switch (field) {
      case 'name':
        return file.name;
      case 'type':
        return formatFileType(file.type);
      case 'size':
        return formatFileSize(file.size);
      default:
        return null;
    }
  }
}

function formatFileSize(bytes: number): string {
  if (bytes < 0) return '0 B';
  if (bytes === 0) return '0 B';

  const units = ['B', 'KB', 'MB', 'GB', 'TB'];
  const index = Math.min(Math.floor(Math.log(bytes) / Math.log(1024)), units.length - 1);
  const value = bytes / Math.pow(1024, index);

  return `${Math.ceil(value)} ${units[index]}`;
}

const FILE_TYPE_LABELS: Record<string, string> = {
  'application/pdf': 'PDF',
  'application/zip': 'ZIP',
  'text/plain': 'TXT',
  'text/csv': 'CSV',
  'text/html': 'HTML',
  'text/markdown': 'MD',
  'application/json': 'JSON',
  'application/xml': 'XML',
  'application/javascript': 'JS',
  'application/typescript': 'TS',
};

function formatFileType(type: string): string {
  if (!type) return 'FILE';
  const label = FILE_TYPE_LABELS[type.toLowerCase()];
  if (label) return label;

  // Fall back to the extension from a non-standard type, or uppercase the sub-type
  // (e.g. image/png -> PNG, application/vnd.ms-powerpoint.presentation -> PPT).
  const subtype = type.split('/')[1];
  if (subtype) {
    const ext = subtype.split('.').pop() ?? subtype;
    return ext.toUpperCase();
  }
  return type.toUpperCase();
}
