import rdfs from '@ontologies/rdfs';
import schema from '@ontologies/schema';
import LinkedRenderStore from 'link-lib';
import {
  Resource,
  ReturnType,
  link,
  linkType,
  lrsType,
  register,
} from 'link-redux';
import React from 'react';

import { sort } from '../../../helpers/data';
import ontola from '../../../ontology/ontola';
import { allTopologiesExcept } from '../../../topologies';
import { actionsBarTopology } from '../../../topologies/ActionsBar';
import { pageTopology } from '../../../topologies/Page';

const order = [
  'create_vote',
  'destroy_vote',
  'create_comment',
  'destroy_comment',
  'try_again',
  'unsubscribe',
  'not_available',
  'contacted',
  'option%3Dyes',
  'option%3Dother',
  'option%3Dno',
];

const sortBind = (potentialActions, props) => potentialActions
  .sort(sort(order))
  .map((iri) => (
    <Resource {...props} isPartOf={props.subject} key={iri} subject={iri} />
  ));

class PotentialActionActionsBar extends React.PureComponent {
  static type = [schema.Thing, rdfs.Resource];

  static property = ontola.favoriteAction;

  static topology = actionsBarTopology;

  static mapDataToProps = {
    potentialActions: {
      label: ontola.favoriteAction,
      returnType: ReturnType.AllTerms,
    },
  };

  static propTypes = {
    lrs: lrsType,
    potentialActions: linkType,
  };

  render() {
    const {
      potentialActions,
      ...props
    } = this.props;

    return (
      <React.Fragment>
        {sortBind(potentialActions, props)}
      </React.Fragment>
    );
  }
}

export default [
  LinkedRenderStore.registerRenderer(
    link({
      potentialActions: {
        label: ontola.favoriteAction,
        returnType: ReturnType.AllTerms,
      },
    })(({ potentialActions, ...props }) => sortBind(potentialActions, props)),
    [schema.Thing, rdfs.Resource],
    ontola.favoriteAction,
    allTopologiesExcept(actionsBarTopology, pageTopology)
  ),
  register(PotentialActionActionsBar),
];
