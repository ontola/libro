import { makeStyles } from '@mui/styles';
import rdf from '@ontologies/core';
import clsx from 'clsx';
import { SomeNode } from 'link-lib';
import React from 'react';

import { GlobalId, LocalId } from '../../Common/lib/seed';
import { ElementsWrapperProps } from '../lib/ElementsWrapperProps';

import { ElementsEditor } from './components';
import { deepSeedRecordToElementsValue } from './lib/deepSeedRecordToElementsValue';
import { editorClassName } from './lib/editorClassName';
import { elementsValueToDeepRecord } from './lib/elementsValueToDeepRecord';

const useStyles = makeStyles((theme: any) => ({
  container: {
    backgroundColor: theme?.palette?.grey?.xxLight,
    border: `1px solid ${theme?.palette?.grey?.xLight}`,
    borderRadius: '5px',
    height: '100%',
    overflowY: 'scroll',
  },
  wrapper: {
    backgroundColor: 'white',
    flex: 1,
    height: '100%',
    overflow: 'hidden',
    paddingBottom: '4em',
    position: 'relative',
  },
}));

const idToNode = (v: GlobalId | LocalId): SomeNode => v.type === 'id'
  ? rdf.namedNode(v.v)
  : rdf.blankNode(v.v);

const ElementsWrapper: React.FC<ElementsWrapperProps> = ({
  placeholder,
  value,
  websiteIRI,
  onChange,
}) => {
  const classes = useStyles();

  return (
    <div className={clsx(classes.wrapper, editorClassName)}>
      <div className={classes.container}>
        <ElementsEditor
          id={value._id.v}
          placeholder={placeholder}
          value={deepSeedRecordToElementsValue(value, websiteIRI, window.EMP_SYMBOL_MAP)}
          onChange={(v) => onChange(elementsValueToDeepRecord(idToNode(value._id), v))}
        />
      </div>
    </div>
  );
};

export default ElementsWrapper;
