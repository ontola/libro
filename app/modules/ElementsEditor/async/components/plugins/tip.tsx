import { createPluginFactory } from '@udecode/plate-core';
import { PlatePluginComponent } from '@udecode/plate-core/dist/types/plugins/PlatePluginComponent';
import React from 'react';

import {
  FertileComponentVariant,
  createComponentWrapper,
} from '../../../../../components/RichText/FertileComponent';

export const ELEMENT_TIP = 'tip';

const Tip: PlatePluginComponent = (props): JSX.Element => {
  const Wrapper = createComponentWrapper('aside', FertileComponentVariant.Tip);

  return (
    <Wrapper {...props.attributes}>
      {props.children}
    </Wrapper>
  );
};

export const createTipPlugin = createPluginFactory({
  component: Tip,
  isElement: true,
  isInline: false,
  isLeaf: false,
  key: ELEMENT_TIP,
});
