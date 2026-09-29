import { inject, InjectionToken, type ExistingProvider, type Type } from '@angular/core';
import type { ElbFileUpload } from './elb-file-upload';

export const ElbFileUploadToken = new InjectionToken<ElbFileUpload>('ElbFileUploadToken');

export function provideElbFileUpload(fileUpload: Type<ElbFileUpload>): ExistingProvider {
  return { provide: ElbFileUploadToken, useExisting: fileUpload };
}

export function injectElbFileUpload(): ElbFileUpload {
  return inject(ElbFileUploadToken);
}
