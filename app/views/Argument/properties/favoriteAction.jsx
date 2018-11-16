import { LinkedResourceContainer, linkType, register } from 'link-redux';
import React from 'react';

import { NS } from '../../../helpers/LinkedRenderStore';
import { allTopologies } from '../../../topologies';

class FavoriteAction extends React.PureComponent {
  static type = NS.argu('Argument');

  static property = NS.argu('favoriteAction');

  static topology = allTopologies;

  static mapDataToProps = [
    NS.argu('favoriteAction'),
    NS.argu('votesProCount'),
  ];

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
