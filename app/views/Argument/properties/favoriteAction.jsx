import {
  LinkedResourceContainer,
  linkType,
  register,
} from 'link-redux';
import React from 'react';

import { NS } from '../../../helpers/LinkedRenderStore';
import ontola from '../../../ontology/ontola';
import { allTopologies } from '../../../topologies';

class FavoriteAction extends React.PureComponent {
  static type = [
    NS.argu('Argument'),
    NS.argu('ProArgument'),
    NS.argu('ConArgument'),
  ];

  static property = ontola.favoriteAction;

  static topology = allTopologies;

  static mapDataToProps = {
    favoriteAction: ontola.favoriteAction,
    votesProCount: NS.argu('votesProCount'),
  };

  static propTypes = {
    favoriteAction: linkType,
    votesProCount: linkType,
  };

  render() {
    const { favoriteAction, votesProCount } = this.props;

    return (
      <LinkedResourceContainer
        count={votesProCount}
        subject={favoriteAction}
      />
    );
  }
}

export default register(FavoriteAction);
