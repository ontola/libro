import { NamedNode } from '@ontologies/core';
import * as rdfs from '@ontologies/rdfs';
import * as schema from '@ontologies/schema';
import {
  FC,
  PropertyProps,
  Resource,
  register,
  useGlobalIds, 
} from 'link-redux';
import { SubjectProp } from 'link-redux/dist-types/types';
import React from 'react';

import { sort } from '../../../helpers/data';
import ontola from '../../../ontology/ontola';
import { allTopologies } from '../../../topologies';

interface SortProps extends PropertyProps, SubjectProp {
  favoriteActions: NamedNode[];
}

const order = [
  'create_vote',
  'destroy_vote',
  'create_comment',
  'destroy_comment',
  'try_again',
  'unsubscribe',
  'not_available',
  'contacted',
  'filter%5B%5D=http%253A%252F%252Fschema.org%252Foption%3Dyes',
  'filter%5B%5D=http%253A%252F%252Fschema.org%252Foption%3Dother',
  'filter%5B%5D=http%253A%252F%252Fschema.org%252Foption%3Dno',
];

const sortBind = (props: SortProps) => props
  .favoriteActions
  .sort(sort(order))
  .map((iri) => (
    <Resource
      {...props}
      isPartOf={props.subject}
      key={iri.value}
      subject={iri}
    />
  ));

const FavoriteAction: FC<PropertyProps> = (props) => {
  const favoriteActions = useGlobalIds(ontola.favoriteAction) ;
  const favoriteActionProps = {
    ...props,
    favoriteActions,
  };

  return(
    <React.Fragment>
      {sortBind(favoriteActionProps)}
    </React.Fragment>
  );
};

FavoriteAction.type = [schema.Thing, rdfs.Resource];

FavoriteAction.property = ontola.favoriteAction;

FavoriteAction.topology = allTopologies;

export default register(FavoriteAction);
