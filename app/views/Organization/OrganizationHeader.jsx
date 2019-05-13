import {
  LinkedResourceContainer,
  Property,
  linkType,
  register,
} from 'link-redux';
import React from 'react';
import MediaQuery from 'react-responsive';

import { mediaQueries } from '../../components/shared/config';
import { NS } from '../../helpers/LinkedRenderStore';
import { values } from '../../helpers/ssr';
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

  static mapDataToProps = [NS.ontola('navigationsMenu')];

  static propTypes = {
    navigationsMenu: linkType,
  };

  static renderMenuItems({ gutterCount, mq }) {
    if (gutterCount === -1) {
      return null;
    }

    return (
      <MediaQuery query={mq} values={values}>
        <div className="NavBarContent__items">
          <Property
            gutter={gutterCount}
            label={NS.ontola('menuItems')}
          />
        </div>
      </MediaQuery>
    );
  }

  render() {
    const { navigationsMenu } = this.props;

    return (
      <LinkedResourceContainer subject={navigationsMenu}>
        {OrganizationNavbar.renderMenuItems(layouts.micro)}
        {OrganizationNavbar.renderMenuItems(layouts.smallestOnly)}
        {OrganizationNavbar.renderMenuItems(layouts.smallOnly)}
        {OrganizationNavbar.renderMenuItems(layouts.largeAndAbove)}
      </LinkedResourceContainer>
    );
  }
}

export default register(OrganizationNavbar);
