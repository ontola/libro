import Grid from '@material-ui/core/Grid';
import Hidden from '@material-ui/core/Hidden';
import { makeStyles } from '@material-ui/styles';
import foaf from '@ontologies/foaf';
import rdfs from '@ontologies/rdfs';
import schema from '@ontologies/schema';
import {
  Property,
  Resource,
  linkType,
  linkedPropType,
  register,
} from 'link-redux';
import PropTypes from 'prop-types';
import React from 'react';

import CardContent from '../../../components/Card/CardContent';
import app from '../../../ontology/app';
import ontola from '../../../ontology/ontola';
import org from '../../../ontology/org';
import { allTopologies } from '../../../topologies';
import { CardMain } from '../../../topologies/Card';
import Container from '../../../topologies/Container';
import ContentDetails from '../../../topologies/ContentDetails';
import { MenuTypes } from '../types';

const useStyles = makeStyles((theme) => ({
  image: {
    backgroundSize: 'cover',
    border: `1px solid ${theme.palette.grey['400']}`,
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

const IsPartOfFull = ({
  currentTab,
  items,
  linkedProp,
  onChange,
}) => {
  const classes = useStyles();

  return (
    <Container>
      <CardMain>
        <Resource subject={linkedProp}>
          <Property label={ontola.coverPhoto} />
          <CardContent>
            <Grid
              container
              alignItems="center"
              spacing={2}
            >
              <Property label={schema.image}>
                <Property label={schema.thumbnail}>
                  {([src]) => (
                    linkedProp && (
                      <Grid item md={1} xs={2}>
                        <div className={classes.wrapper}>
                          <div
                            className={classes.image}
                            style={{ backgroundImage: `url("${src.value}")` }}
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
        </Resource>
        <Property
          forceRender
          currentTab={currentTab}
          items={items}
          label={app.menuTabs}
          onChange={onChange}
        />
      </CardMain>
    </Container>
  );
};

IsPartOfFull.type = MenuTypes;

IsPartOfFull.property = schema.isPartOf;

IsPartOfFull.topology = allTopologies;

IsPartOfFull.propTypes = {
  currentTab: linkType,
  items: PropTypes.arrayOf(PropTypes.element),
  linkedProp: linkedPropType,
  onChange: PropTypes.func,
};

export default register(IsPartOfFull);
