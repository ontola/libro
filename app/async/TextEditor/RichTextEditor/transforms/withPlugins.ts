import { ReactEditor } from 'slate-react';
import {
  pipe,
  ToggleTypeEditor,
  TransformEditor,
  withImageUpload,
  withInlineVoid,
  withLink,
  withToggleType,
  withTransforms,
  withTrailingNode,
} from '@udecode/slate-plugins';
import { DefaultPlugins, options } from '../plugins/DefaultPlugins';
import { CommandEditor } from '../plugins/types';
import { withListItems } from './withListItems';


export const withPlugins = <T extends ReactEditor>(e: T) => {
  const editor = pipe(e, 
    withLink(), // after withTrailingNode?
    withImageUpload(),
    withToggleType({ defaultType: options.p.type }),
    withTransforms(),
    withTrailingNode({ type: options.p.type }), // together with withTransforms
    withInlineVoid({ plugins: DefaultPlugins }),
    withListItems,
  ) as T & ToggleTypeEditor & TransformEditor & CommandEditor;
  
  editor.commandPlugins = DefaultPlugins;
  
  return editor;
}
