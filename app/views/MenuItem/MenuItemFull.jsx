import AppBar from '@material-ui/core/AppBar';
import Grid from '@material-ui/core/Grid';
import Hidden from '@material-ui/core/Hidden';
import { makeStyles } from '@material-ui/styles';
import foaf from '@ontologies/foaf';
import rdf from '@ontologies/core';
import rdfs from '@ontologies/rdfs';
import rdfx from '@ontologies/rdf';
import schema from '@ontologies/schema';
import {
  Property,
  Resource,
  linkType,
  register,
  useResourceProperty,
} from 'link-redux';
import * as PropTypes from 'prop-types';
import React from 'react';
import { Redirect, withRouter } from 'react-router';

import CardContent from '../../components/Card/CardContent';
import { retrievePath } from '../../helpers/iris';
import { currentLocation } from '../../helpers/paths';
import { isPromise } from '../../helpers/types';
import { useContainerToArr } from '../../hooks/useSeqToArr';
import argu from '../../ontology/argu';
import ontola from '../../ontology/ontola';
import org from '../../ontology/org';
import { CardMain } from '../../topologies/Card';
import Container from '../../topologies/Container';
import ContentDetails from '../../topologies/ContentDetails';
import { fullResourceTopology } from '../../topologies/FullResource';
import TabBar from '../../topologies/TabBar';
import TabPane from '../../topologies/TabPane';

/* eslint-disable no-magic-numbers */
const useStyles = makeStyles((theme) => ({
  image: {
    backgroundSize: 'cover',
    border: `1px solid ${theme.palette.grey[400]}`,
    borderRadius: '100%',
    bottom: 0,
    left: 0,
    position: 'absolute',
    right: 0,
    top: 0,
  },
  wrapper: {
    paddingTop: '100%',
    position: 'relative',
    width: '100%',
  },
}));
/* eslint-enable no-magic-numbers */

const MenuItemFull = ({
  location,
  menuItems: menuItemsIRI,
  topLevel,
}) => {
  const classes = useStyles();
  const isPrimaryResource = topLevel && !menuItemsIRI;

  let currentTab, redirectTarget, body;
  const items = useContainerToArr(menuItemsIRI);
  const [firstItem] = useResourceProperty(menuItemsIRI, rdfx.ns('_0'));

  const menuItemTabs = () => {
    if (!__CLIENT__) {
      return null;
    }

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
  };

  if (items) {
    currentTab = items.find((s) => rdf.equals(s, currentLocation(location)));

    if (!currentTab) {
      redirectTarget = firstItem;
    }
  }

  if (!redirectTarget && (isPrimaryResource || !topLevel)) {
    body = (
      <React.Fragment>
        <Property label={ontola.parentMenu} topLevel={false} />
        <TabPane>
          <Property label={ontola.href} />
        </TabPane>
      </React.Fragment>
    );
  } else if (currentTab && topLevel) {
    body = (
      <Resource
        subject={currentTab}
        topLevel={false}
      />
    );
  }

  return (
    <React.Fragment>
      {topLevel && redirectTarget && __CLIENT__ && (
        <Redirect to={retrievePath(redirectTarget.value)} />
      )}
      {topLevel && (
        <Container>
          <CardMain>
            <Property label={schema.isPartOf}>
              <Property label={ontola.coverPhoto} />
              <CardContent>
                <Grid
                  container
                  alignItems="center"
                  spacing={2}
                >
                  <Property label={schema.image}>
                    <Property label={schema.thumbnail}>
                      {([linkedProp]) => (
                        linkedProp && (
                          <Grid item md={1} xs={2}>
                            <div className={classes.wrapper}>
                              <div
                                className={classes.image}
                                style={{ backgroundImage: `url("${linkedProp.value}")` }}
                              />
                            </div>
                          </Grid>
                        )
                      )}
                    </Property>
                  </Property>
                  <Grid item md={11} xs={10}>
                    <Property label={[schema.name, rdfs.label, foaf.name]} />
                    <Hidden smDown>
                      <ContentDetails>
                        <Property label={org.organization} limit={Infinity} />
                      </ContentDetails>
                    </Hidden>
                  </Grid>
                </Grid>
                <Hidden mdUp>
                  <ContentDetails>
                    <Property label={org.organization} limit={Infinity} />
                  </ContentDetails>
                </Hidden>
              </CardContent>
              <CardContent>
                <Property label={schema.description} />
              </CardContent>
            </Property>
            <AppBar color="inherit" elevation={0} position="static">
              <TabBar>
                {menuItemTabs()}
              </TabBar>
            </AppBar>
          </CardMain>
        </Container>
      )}
      {body}
    </React.Fragment>
  );
};

MenuItemFull.type = [
  ontola.MenuItem,
  argu.MenuSection,
  argu.SubMenu,
  argu.Menu,
];

MenuItemFull.topology = fullResourceTopology;

MenuItemFull.mapDataToProps = {
  dataSubjects: ontola.menuItems,
  menuItems: ontola.menuItems,
  parentMenu: ontola.parentMenu,
};

MenuItemFull.hocs = [withRouter];

MenuItemFull.propTypes = {
  location: PropTypes.shape({}),
  menuItems: linkType,
  topLevel: PropTypes.bool,
};

MenuItemFull.defaultProps = {
  topLevel: true,
};


export default register(MenuItemFull);
