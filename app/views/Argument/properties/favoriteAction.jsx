import {
  Resource,
  linkType,
  register,
} from 'link-redux';
import React from 'react';

import argu from '../../../ontology/argu';
import ontola from '../../../ontology/ontola';
import { allTopologies } from '../../../topologies';

class FavoriteAction extends React.PureComponent {
  static type = [
    argu.ns('Argument'),
    argu.ns('ProArgument'),
    argu.ns('ConArgument'),
  ];

  static property = ontola.favoriteAction;

  static topology = allTopologies;

  static mapDataToProps = {
    favoriteAction: ontola.favoriteAction,
    votesProCount: argu.ns('votesProCount'),
  };

  static propTypes = {
    favoriteAction: linkType,
    votesProCount: linkType,
  };

  render() {
    const { favoriteAction, votesProCount } = this.props;

    return (
      <Resource
        count={votesProCount}
        subject={favoriteAction}
      />
    );
  }
}

export default register(FavoriteAction);
