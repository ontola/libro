import Grid from '@material-ui/core/Grid';
import Hidden from '@material-ui/core/Hidden';
import { makeStyles } from '@material-ui/styles';
import { SomeTerm } from '@ontologies/core';
import * as foaf from '@ontologies/foaf';
import * as rdfs from '@ontologies/rdfs';
import * as schema from '@ontologies/schema';
import {
  FC,
  Property,
  register,
  useGlobalIds,
} from 'link-redux';
import React from 'react';

import AllWithProperty from '../../components/AllWithProperty';
import SubSection from '../../components/SubSection';
import ontola from '../../ontology/ontola';
import org from '../../ontology/org';
import { LibroTheme } from '../../themes/themes';
import { fullResourceTopology } from '../../topologies';
import ContentDetails from '../../topologies/ContentDetails';
import MainBody from '../../topologies/MainBody';

const useStyles = makeStyles((theme: LibroTheme) => ({
  image: {
    backgroundSize: 'cover',
    border: `1px solid ${theme.palette.grey.light}`,
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

const PersonFull: FC = () => {
  const classes = useStyles();
  const [settingsMenu] = useGlobalIds(ontola.settingsMenu);

  return (
    <React.Fragment>
      <MainBody>
        <Grid
          container
          alignItems="center"
          spacing={2}
        >
          <Property label={schema.image}>
            <Property label={schema.thumbnail}>
              {([src]: SomeTerm[]) => (
                <Grid
                  item
                  md={1}
                  xs={2}
                >
                  <div className={classes.wrapper}>
                    <div
                      className={classes.image}
                      style={{ backgroundImage: `url("${src.value}")` }}
                    />
                  </div>
                </Grid>
              )}
            </Property>
          </Property>
          <Grid
            item
            md={11}
            xs={10}
          >
            <Property label={[schema.name, rdfs.label, foaf.name]} />
            <Hidden smDown>
              <ContentDetails>
                <AllWithProperty label={org.organization} />
              </ContentDetails>
            </Hidden>
          </Grid>
          {' '}

        </Grid>
        <Hidden mdUp>
          <ContentDetails>
            <AllWithProperty label={org.organization} />
          </ContentDetails>
        </Hidden>
        <Property label={schema.description} />
      </MainBody>
      <SubSection menu={settingsMenu} />
    </React.Fragment>
  );
};

PersonFull.type = [
  schema.Person,
  foaf.Person,
];

PersonFull.topology = fullResourceTopology;

export default register(PersonFull);
