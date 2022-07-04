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

import { allTopologies } from '../../../../../topologies';
import ontola from '../../../../Kernel/ontology/ontola';
import { ButtonVariant } from '../../../components/Button';
import { sort } from '../../../lib/data';

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
  .slice()
  .sort(sort(order))
  .map((iri) => (
    <Resource
      {...props}
      isPartOf={props.subject}
      key={iri.value}
      subject={iri}
      variant={ButtonVariant.Default}
    />
  ));

const FavoriteAction: FC<PropertyProps> = (props) => {
  const favoriteActions = useGlobalIds(ontola.favoriteAction);
  const actions = React.useMemo(() => {
    const favoriteActionProps = {
      ...props,
      favoriteActions,
    };

    return (
      sortBind(favoriteActionProps)
    );
  }, [favoriteActions]);

  return (
    <React.Fragment>
      {actions}
    </React.Fragment>
  );
};

FavoriteAction.type = [schema.Thing, rdfs.Resource];

FavoriteAction.property = ontola.favoriteAction;

FavoriteAction.topology = allTopologies;

export default register(FavoriteAction);
