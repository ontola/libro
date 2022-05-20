import rdf from '@ontologies/core';
import { createPluginFactory } from '@udecode/plate-core';
import { PlatePluginComponent } from '@udecode/plate-core/dist/types/plugins/PlatePluginComponent';
import { FieldSet } from 'link-lib/dist-types/store/StructuredStore';
import { Resource, useLRS } from 'link-redux';
import React from 'react';

export const ELEMENT_GRID = 'grid'
  + '';

const useTempRecord = <T extends Record<string, unknown>>(fields: FieldSet): (props: React.PropsWithChildren<T>) => JSX.Element => {
  const lrs = useLRS();

  const [id, _] = React.useState(() => rdf.blankNode());

  React.useEffect(() => {
    const store = lrs.store.getInternalStore().store;
    store.setRecord(id.value, fields);

    return () => store.deleteRecord(id.value);
  }, [id.value, fields]);

  return () => <Resource subject={id} />;
};

const Grid: PlatePluginComponent = (props): JSX.Element => {
  const fields = React.useMemo(() => ({}), []);
  const Record = useTempRecord(fields);

  return (
    <Record>
      {props.children}
    </Record>
  );
};

export const createGridPlugin = createPluginFactory({
  component: Grid,
  isElement: true,
  isInline: false,
  isLeaf: false,
  key: ELEMENT_GRID,
});
