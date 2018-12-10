import {
  linkType,
  lrsType,
  Property,
  register,
  subjectType,
} from 'link-redux';
import * as PropTypes from 'prop-types';
import React from 'react';
import { Redirect } from 'react-router';

import TabBarWrapper from '../../components/TabBarWrapper';
import { currentURL, retrievePath } from '../../helpers/iris';
import { NS } from '../../helpers/LinkedRenderStore';
import { pageTopology } from '../../topologies/Page';
import PageHeader from '../../topologies/PageHeader';
import PrimaryResource, { primaryResourceTopology } from '../../topologies/PrimaryResource';
import TabBar from '../../topologies/TabBar';
import TabPane from '../../topologies/TabPane';

class MenuItemPage extends React.PureComponent {
  static type = [
    NS.argu('MenuItem'),
    NS.argu('MenuSection'),
    NS.argu('SubMenu'),
    NS.argu('Menu'),
  ];

  static topology = [
    pageTopology,
    primaryResourceTopology,
  ];

  static mapDataToProps = [NS.argu('menuItems'), NS.argu('parentMenu')];

  static propTypes = {
    lrs: lrsType,
    menuItems: linkType,
    subject: subjectType,
    topLevel: PropTypes.bool,
  };

  static defaultProps = {
    topLevel: true,
  };

  redirectTarget() {
    const { lrs, menuItems, subject } = this.props;

    if (menuItems && currentURL() === subject.value) {
      const firstTab = lrs.getResourceProperty(menuItems, NS.rdf('_0')).value;
      return retrievePath(firstTab);
    }

    return undefined;
  }

  render() {
    const { topLevel } = this.props;

    const r = this.redirectTarget();
    if (r) {
      return (
        <Redirect to={r} />
      );
    }

    return (
      <PrimaryResource>
        {topLevel && (
          <PageHeader>
            <Property label={NS.schema('isPartOf')} />
          </PageHeader>
        )}
        <Property label={NS.argu('parentMenu')} topLevel={false} />
        <TabBarWrapper>
          <TabBar>
            <Property label={NS.argu('menuItems')} />
          </TabBar>
        </TabBarWrapper>
        <TabPane>
          <Property label={NS.argu('href')} />
        </TabPane>
      </PrimaryResource>
    );
  }
}

export default register(MenuItemPage);
