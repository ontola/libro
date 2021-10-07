import { WebManifest } from '../../../appContext';
import { LibroDocument } from '../components/Studio';

export interface PageViewerState {
  doc: LibroDocument;
  currentResource: string | undefined;
  manifest: Partial<WebManifest>;
}
