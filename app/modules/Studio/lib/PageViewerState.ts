import { WebManifest } from '../../../WebManifest';
import { LibroDocument } from '../components/StudioLoader';

export interface PageViewerState {
  doc: LibroDocument;
  currentResource: string | undefined;
  manifest: WebManifest;
}
