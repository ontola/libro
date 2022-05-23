import { makeStyles } from '@mui/styles';
import * as as from '@ontologies/as';
import { SomeTerm } from '@ontologies/core';
import {
  FC,
  Property,
  register,
  useProperty,
} from 'link-redux';
import React from 'react';

import CollectionCreateButton, { TriggerType } from '../../components/Collection/CollectionCreateButton';
import { useHasInteraction } from '../../components/Collection/CollectionProvider';
import ontola from '../../ontology/ontola';
import { listTopology } from '../../topologies';
import { ListDirection } from '../../topologies/List';

import { CollectionTypes } from './types';

export interface CollectionListProps {
  direction: ListDirection,
  wrap?: boolean;
  to: SomeTerm;
}

const useStyles = makeStyles(() => ({
  createButton: {
    display: 'flex',
    flexDirection: 'column-reverse',
    justifyContent: 'space-around',
  },
}));

const CollectionList: FC<CollectionListProps> = ({
  subject,
  to,
}) => {
  const classes = useStyles();
  const [totalItems] = useProperty(as.totalItems);
  const pagesShouldRender = totalItems?.value !== '0';
  const hasInteraction = useHasInteraction(subject);

  if (!pagesShouldRender && !hasInteraction) {
    return null;
  }

  return (
    <React.Fragment>
      {pagesShouldRender && (
        <Property
          forceRender
          insideCollection
          label={ontola.pages}
        />
      )}
      <Property
        label={as.totalItems}
        to={to}
      />
      <div className={classes.createButton}>
        <CollectionCreateButton trigger={TriggerType.Icon} />
      </div>
    </React.Fragment>
  );
};

CollectionList.type = CollectionTypes;

CollectionList.topology = [
  listTopology,
];

export default register(CollectionList);
