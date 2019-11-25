import rdfs from '@ontologies/rdfs';
import schema from '@ontologies/schema';
import LinkedRenderStore from 'link-lib';
import {
  LinkedResourceContainer,
  link,
  linkType,
  lrsType,
  register,
} from 'link-redux';
import React from 'react';

import { sort } from '../../../helpers/data';
import { NS } from '../../../helpers/LinkedRenderStore';
import { allTopologiesExcept } from '../../../topologies';
import { actionsBarTopology } from '../../../topologies/ActionsBar';

const order = [
  'create_vote',
  'destroy_vote',
  'create_comment',
  'destroy_comment',
  'try_again',
  'unsubscribe',
  'not_available',
  'contacted',
];

const sortBind = (potentialActions, props) => potentialActions
  .sort(sort(order))
  .map(iri => (
    <LinkedResourceContainer {...props} isPartOf={props.subject} key={iri} subject={iri} />
  ));

class PotentialActionActionsBar extends React.PureComponent {
  static type = [schema.Thing, rdfs.Resource];

  static property = NS.ontola('favoriteAction');

  static topology = actionsBarTopology;

  static mapDataToProps = {
    potentialActions: {
      label: NS.ontola('favoriteAction'),
      limit: Infinity,
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
        label: NS.ontola('favoriteAction'),
        limit: Infinity,
      },
    })(({ potentialActions, ...props }) => sortBind(potentialActions, props)),
    [schema.Thing, rdfs.Resource],
    NS.ontola('favoriteAction'),
    allTopologiesExcept(actionsBarTopology)
  ),
  register(PotentialActionActionsBar),
];
