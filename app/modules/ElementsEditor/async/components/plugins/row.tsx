import { createPluginFactory } from '@udecode/plate-core';
import type { PlatePluginComponent } from '@udecode/plate-core/dist/types/plugins/PlatePluginComponent';
import {
  Resource,
  Type,
  useLRS,
  useTempRecord,
} from 'link-redux';
import React from 'react';

import elements from '../../../../Elements/ontology/elements';
import { EditWrapper } from '../EditWrapper';
import { SetSubject } from '../SetSubject';

export const ELEMENT_ROW = 'row';

const Row: PlatePluginComponent = (props): JSX.Element => {
  const lrs = useLRS();

  const { ref, ...attributes } = props.attributes;

  const id = useTempRecord(elements.Row, (set) => {
    set(elements.gap, props.attributes.gap);
    set(elements.align, props.attributes.align);
  }, []);

  return (
    <EditWrapper
      attributes={props.attributes}
      onClick={() => lrs.actions.ontola.showSnackbar('Clicked the row edit icon!')}
    >
      <SetSubject
        subject={id}
        {...attributes}
      >
        <Resource subject={id}>
          <Type ref={ref}>
            {props.children}
          </Type>
        </Resource>
      </SetSubject>
    </EditWrapper>
  );
};

export const createRowPlugin = createPluginFactory({
  component: Row,
  isElement: true,
  isInline: false,
  isLeaf: false,
  key: ELEMENT_ROW,
});
