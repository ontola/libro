import { namedNodeByIRI } from 'link-lib';
import {
  LinkedResourceContainer,
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

  static mapDataToProps = {
    dataSubjects: NS.argu('menuItems'),
    menuItems: NS.argu('menuItems'),
    parentMenu: NS.argu('parentMenu'),
  };

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
      return lrs.getResourceProperty(menuItems, NS.rdf('_0'));
    }

    return undefined;
  }

  isPrimaryResource() {
    return this.props.topLevel && !this.props.menuItems;
  }

  render() {
    const { topLevel } = this.props;

    const r = this.redirectTarget();
    let body;

    if (!r && (this.isPrimaryResource() || !topLevel)) {
      body = (
        <React.Fragment>
          <Property label={NS.argu('parentMenu')} topLevel={false} />
          <TabPane>
            <Property label={NS.argu('href')} />
          </TabPane>
        </React.Fragment>
      );
    } else if (topLevel) {
      body = (
        <LinkedResourceContainer
          subject={r || namedNodeByIRI(currentURL())}
          topLevel={false}
        />
      );
    }

    return (
      <PrimaryResource>
        {topLevel && r && <Redirect to={retrievePath(r.value)} />}
        {topLevel && (
          <React.Fragment>
            <PageHeader>
              <Property label={NS.schema('isPartOf')} />
            </PageHeader>
            <TabBarWrapper>
              <TabBar>
                <Property label={NS.argu('menuItems')} />
              </TabBar>
            </TabBarWrapper>
          </React.Fragment>
        )}
        {body}
      </PrimaryResource>
    );
  }
}

export default register(MenuItemPage);
