import { SPEditor } from '@udecode/plate-core';
import { Editor } from 'slate';
import { ReactEditor, useSlate } from 'slate-react';

export type ElementsEditor = Editor & ReactEditor & SPEditor;

export const useElementsEditor = (): ElementsEditor =>
  useSlate() as unknown as ElementsEditor;
