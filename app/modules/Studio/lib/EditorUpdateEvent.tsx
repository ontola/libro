import { PageViewerState } from './PageViewerState';

export enum EditorEvents {
  Loaded,
  EditorUpdate,
  EditorClose,
}

export interface EditorUpdateEvent {
  type: EditorEvents;
  viewOpts: PageViewerState;
}
