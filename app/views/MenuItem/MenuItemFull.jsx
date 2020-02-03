import AppBar from '@material-ui/core/AppBar';
import rdf from '@ontologies/core';
import rdfx from '@ontologies/rdf';
import schema from '@ontologies/schema';
import {
  Property,
  Resource,
  linkType,
  lrsType,
  register,
} from 'link-redux';
import * as PropTypes from 'prop-types';
import React from 'react';
import { Redirect, withRouter } from 'react-router';

import CardContent from '../../components/Card/CardContent';
import { containerToArr, seqToArr } from '../../helpers/data';
import { retrievePath } from '../../helpers/iris';
import { currentLocation } from '../../helpers/paths';
import { isPromise } from '../../helpers/types';
import argu from '../../ontology/argu';
import ontola from '../../ontology/ontola';
import org from '../../ontology/org';
import { CardMain } from '../../topologies/Card';
import Container from '../../topologies/Container';
import ContentDetails from '../../topologies/ContentDetails';
import { fullResourceTopology } from '../../topologies/FullResource';
import TabBar from '../../topologies/TabBar';
import TabPane from '../../topologies/TabPane';

class MenuItemFull extends React.PureComponent {
  static type = [
    ontola.MenuItem,
    argu.MenuSection,
    argu.SubMenu,
    argu.Menu,
  ];

  static topology = fullResourceTopology;

  static mapDataToProps = {
    dataSubjects: ontola.menuItems,
    menuItems: ontola.menuItems,
    parentMenu: ontola.parentMenu,
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

    if (isPromise(items)) {
      // TODO: Loading
      return null;
    }

    return items.map((iri) => (
      <Resource
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

      const currentItem = menuItemsArr.find((s) => rdf.equals(s, currentLocation(location)));

      if (!currentItem) {
        return lrs.getResourceProperty(menuItems, rdfx.ns('_0'));
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
          <Property label={ontola.parentMenu} topLevel={false} />
          <TabPane>
            <Property label={ontola.href} />
          </TabPane>
        </React.Fragment>
      );
    } else if (topLevel) {
      body = (
        <Resource
          subject={r || currentLocation(location)}
          topLevel={false}
        />
      );
    }

    return (
      <React.Fragment>
        {topLevel && r && __CLIENT__ && <Redirect to={retrievePath(r.value)} />}
        {topLevel && (
          <Container>
            <CardMain>
              <Property label={schema.isPartOf}>
                <Property label={ontola.coverPhoto} />
                <CardContent>
                  <Property label={schema.name} />
                  <ContentDetails>
                    <Property label={org.organization} limit={Infinity} />
                  </ContentDetails>
                  <Property label={schema.description} />
                </CardContent>
              </Property>
              <AppBar color="inherit" elevation={0} position="static">
                <TabBar>
                  {this.menuItemTabs()}
                </TabBar>
              </AppBar>
            </CardMain>
          </Container>
        )}
        {body}
      </React.Fragment>
    );
  }
}

export default register(MenuItemFull);
