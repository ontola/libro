import { createPluginFactory } from '@udecode/plate-core';
import { PlatePluginComponent } from '@udecode/plate-core/dist/types/plugins/PlatePluginComponent';
import React from 'react';

import {
  FertileComponentVariant,
  createComponentWrapper,
} from '../../../../../components/RichText/FertileComponent';

export const ELEMENT_NOTE = 'note';

const Note: PlatePluginComponent = (props): JSX.Element => {
  const Wrapper = createComponentWrapper('aside', FertileComponentVariant.Note);

  return (
    <Wrapper {...props.attributes}>
      {props.children}
    </Wrapper>
  );
};

export const createNotePlugin = createPluginFactory({
  component: Note,
  isElement: true,
  isInline: false,
  isLeaf: false,
  key: ELEMENT_NOTE,
});
