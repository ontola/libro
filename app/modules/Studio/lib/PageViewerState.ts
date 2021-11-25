import { WebManifest } from '../../../WebManifest';
import { LibroDocument } from '../components/Studio';

export interface PageViewerState {
  doc: LibroDocument;
  currentResource: string | undefined;
  manifest: WebManifest;
}
