import rdfs from '@ontologies/rdfs';
import schema from '@ontologies/schema';
import {
  Resource,
  ReturnType,
  register,
} from 'link-redux';
import React from 'react';

import { sort } from '../../../helpers/data';
import ontola from '../../../ontology/ontola';
import { allTopologies } from '../../../topologies';

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

const sortBind = (props) => props
  .favoriteActions
  .sort(sort(order))
  .map((iri) => (
    <Resource {...props} isPartOf={props.subject} key={iri} subject={iri} />
  ));

const FavoriteAction = (props) => (
  <React.Fragment>
    {sortBind(props)}
  </React.Fragment>
);

FavoriteAction.type = [schema.Thing, rdfs.Resource];

FavoriteAction.property = ontola.favoriteAction;

FavoriteAction.topology = allTopologies;

FavoriteAction.mapDataToProps = {
  favoriteActions: {
    label: ontola.favoriteAction,
    returnType: ReturnType.AllTerms,
  },
};

export default register(FavoriteAction);
