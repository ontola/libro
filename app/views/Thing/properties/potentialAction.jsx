import LinkedRenderStore from 'link-lib';
import {
  link,
  LinkedResourceContainer,
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
];

const sortBind = (potentialActions, props) => potentialActions
  .sort(sort(order))
  .map(iri => (
    <LinkedResourceContainer {...props} isPartOf={props.subject} key={iri} subject={iri} />
  ));

class PotentialActionActionsBar extends React.PureComponent {
  static type = [NS.schema('Thing'), NS.rdfs('Resource')];

  static property = NS.argu('favoriteAction');

  static topology = actionsBarTopology;

  static mapDataToProps = {
    potentialActions: {
      label: NS.argu('favoriteAction'),
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
        label: NS.argu('favoriteAction'),
        limit: Infinity,
      },
    })(({ potentialActions, ...props }) => sortBind(potentialActions, props)),
    [NS.schema('Thing'), NS.rdfs('Resource')],
    NS.argu('favoriteAction'),
    allTopologiesExcept(actionsBarTopology)
  ),
  register(PotentialActionActionsBar),
];
