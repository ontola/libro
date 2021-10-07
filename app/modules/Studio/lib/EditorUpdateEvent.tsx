import { PageViewerState } from './PageViewerState';

export enum EditorEvents {
  EditorUpdate,
  EditorClose,
}

export interface EditorUpdateEvent {
  type: EditorEvents;
  viewOpts: PageViewerState;
}
