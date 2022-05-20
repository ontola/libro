import * as rdfs from '@ontologies/rdfs';
import { createPluginFactory } from '@udecode/plate-core';
import type { PlatePluginComponent } from '@udecode/plate-core/dist/types/plugins/PlatePluginComponent';
import { Resource, useTempRecord } from 'link-redux';
import React from 'react';

export const ELEMENT_RECORD = 'record';

const Record: PlatePluginComponent = (props): JSX.Element => {
  const id = useTempRecord(rdfs.Resource, () => undefined, []);

  return (
    <Resource subject={id}>
      {props.children}
    </Resource>
  );
};

export const createRecordPlugin = createPluginFactory({
  component: Record,
  isElement: true,
  isInline: false,
  isLeaf: false,
  key: ELEMENT_RECORD,
});
