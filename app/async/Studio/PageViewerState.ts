import { WebManifest } from '../../appContext';

import { LibroDocument } from './LibroDocument';

export interface PageViewerState {
  doc: LibroDocument;
  currentResource: string | undefined;
  manifest: Partial<WebManifest>;
}
