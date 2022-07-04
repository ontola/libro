import { WebManifest } from '../../Kernel/components/AppContext/WebManifest';
import { LibroDocument } from '../components/StudioLoader';

export interface PageViewerState {
  doc: LibroDocument;
  currentResource: string | undefined;
  manifest: WebManifest;
}
