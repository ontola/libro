import AppBar from '@material-ui/core/AppBar';
import {
  LinkedResourceContainer,
  linkType,
  lrsType,
  Property,
  register,
} from 'link-redux';
import * as PropTypes from 'prop-types';
import { NamedNode } from 'rdflib';
import React from 'react';
import { Redirect, withRouter } from 'react-router';

import { containerToArr, seqToArr } from '../../helpers/data';
import { retrievePath } from '../../helpers/iris';
import { NS } from '../../helpers/LinkedRenderStore';
import { pageTopology } from '../../topologies/Page';
import PageHeader from '../../topologies/PageHeader';
import PrimaryResource, { primaryResourceTopology } from '../../topologies/PrimaryResource';
import TabBar from '../../topologies/TabBar';
import TabPane from '../../topologies/TabPane';
import { currentLocation } from '../../helpers/paths';

class MenuItemPage extends React.PureComponent {
  static type = [
    NS.ontola('MenuItem'),
    NS.argu('MenuSection'),
    NS.argu('SubMenu'),
    NS.argu('Menu'),
  ];

  static topology = [
    pageTopology,
    primaryResourceTopology,
  ];

  static mapDataToProps = {
    dataSubjects: NS.ontola('menuItems'),
    menuItems: NS.ontola('menuItems'),
    parentMenu: NS.ontola('parentMenu'),
  };

  static hocs = [withRouter];

  static propTypes = {
    location: PropTypes.shape({}),
    lrs: lrsType,
    menuItems: linkType,
    topLevel: PropTypes.bool,
  };

  static defaultProps = {
    topLevel: true,
  };

  menuItemTabs() {
    if (!__CLIENT__) {
      return null;
    }

    const items = containerToArr(this.props.lrs, [], this.props.menuItems);

    if (Object.prototype.hasOwnProperty.call(items, 'then')) {
      // TODO: Loading
      return null;
    }

    return items.map(iri => (
      <LinkedResourceContainer
        key={iri.value}
        subject={iri}
        value={iri.value}
      />
    ));
  }

  redirectTarget() {
    const {
      location,
      lrs,
      menuItems,
    } = this.props;

    if (menuItems) {
      const menuItemsArr = seqToArr(lrs, [], menuItems);

      const currentItem = menuItemsArr.find(s => s === currentLocation(location));

      if (!currentItem) {
        return lrs.getResourceProperty(menuItems, NS.rdf('_0'));
      }
    }

    return undefined;
  }

  isPrimaryResource() {
    return this.props.topLevel && !this.props.menuItems;
  }

  render() {
    const { location, topLevel } = this.props;

    const r = this.redirectTarget();
    let body;

    if (!r && (this.isPrimaryResource() || !topLevel)) {
      body = (
        <React.Fragment>
          <Property label={NS.ontola('parentMenu')} topLevel={false} />
          <TabPane>
            <Property label={NS.ontola('href')} />
          </TabPane>
        </React.Fragment>
      );
    } else if (topLevel) {
      body = (
        <LinkedResourceContainer
          subject={r || NamedNode.find(currentLocation(location))}
          topLevel={false}
        />
      );
    }

    return (
      <PrimaryResource>
        {topLevel && r && __CLIENT__ && <Redirect to={retrievePath(r.value)} />}
        {topLevel && (
          <React.Fragment>
            <PageHeader>
              <Property label={NS.schema('isPartOf')} />
              <AppBar color="inherit" elevation={0} position="static">
                <TabBar>
                  {this.menuItemTabs()}
                </TabBar>
              </AppBar>
            </PageHeader>
          </React.Fragment>
        )}
        {body}
      </PrimaryResource>
    );
  }
}

export default register(MenuItemPage);
