import {
  LinkedResourceContainer,
  Property,
  linkType,
  register, lrsType,
} from 'link-redux';
import React from 'react';
import MediaQuery from 'react-responsive';

import Button from '../../components/Button';
import { mediaQueries } from '../../components/shared/config';
import VerticalScroller from '../../components/VerticalScroller';
import { NS } from '../../helpers/LinkedRenderStore';
import { navbarTopology } from '../../topologies/Navbar';

const layouts = {
  largeAndAbove: {
    gutterCount: 6,
    mq: mediaQueries.largeAndAbove,
  },
  micro: {
    gutterCount: -1,
    mq: mediaQueries.micro,
  },
  smallOnly: {
    gutterCount: 4,
    mq: mediaQueries.smallOnly,
  },
  smallestOnly: {
    gutterCount: 2,
    mq: mediaQueries.smallestOnly,
  },
};

class OrganizationNavbar extends React.PureComponent {
  static type = [NS.schema('Organization'), NS.argu('Page')];

  static topology = navbarTopology;

  static mapDataToProps = [NS.argu('navigationsMenu')];

  static propTypes = {
    lrs: lrsType,
    navigationsMenu: linkType,
  };

  renderMenuItems({ gutterCount, mq }) {
    if (gutterCount === -1) {
      return null;
    }

    return (
      <MediaQuery query={mq}>
        <VerticalScroller>
          <Property
            gutter={gutterCount}
            label={NS.argu('menuItems')}
            renderGutter={() => (
              <Button
                narrow
                plain
                className="Menu__button"
                onClick={() => this.props.lrs.exec(NS.app('actions/menu/open'))}
              >
                ...
              </Button>
            )}
          />
        </VerticalScroller>
      </MediaQuery>
    );
  }

  render() {
    const { navigationsMenu } = this.props;

    return (
      <LinkedResourceContainer subject={navigationsMenu}>
        {this.renderMenuItems(layouts.micro)}
        {this.renderMenuItems(layouts.smallestOnly)}
        {this.renderMenuItems(layouts.smallOnly)}
        {this.renderMenuItems(layouts.largeAndAbove)}
      </LinkedResourceContainer>
    );
  }
}

export default register(OrganizationNavbar);
