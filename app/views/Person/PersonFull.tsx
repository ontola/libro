import Grid from '@material-ui/core/Grid';
import Hidden from '@material-ui/core/Hidden';
import { makeStyles } from '@material-ui/styles';
import { NamedNode, SomeTerm } from '@ontologies/core';
import * as foaf from '@ontologies/foaf';
import * as rdfs from '@ontologies/rdfs';
import * as schema from '@ontologies/schema';
import {
  FC,
  Property,
  register,
  useProperty,
} from 'link-redux';
import React from 'react';

import CardContent from '../../components/Card/CardContent';
import TabbarProvider from '../../components/TabbarProvider';
import app from '../../ontology/app';
import ontola from '../../ontology/ontola';
import org from '../../ontology/org';
import { CardMain } from '../../topologies/Card';
import Container from '../../topologies/Container';
import ContentDetails from '../../topologies/ContentDetails';
import { LibroTheme } from '../../themes/themes';
import { fullResourceTopology } from '../../topologies/FullResource';

const useStyles = makeStyles((theme: LibroTheme) => ({
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

const PersonFull: FC = () => {
  const classes = useStyles();
  const [profileMenu] = useProperty(ontola.profileMenu) as NamedNode[];

  return (
    <TabbarProvider
      redirect
      menu={profileMenu}
    >
      <Property label={ontola.coverPhoto} />
      <Container>
        <CardMain>
          <CardContent>
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
                    <Property
                      label={org.organization}
                      limit={Infinity}
                    />
                  </ContentDetails>
                </Hidden>
              </Grid>
            </Grid>
            <Hidden mdUp>
              <ContentDetails>
                <Property
                  label={org.organization}
                  limit={Infinity}
                />
              </ContentDetails>
            </Hidden>
          </CardContent>
          <CardContent>
            <Property label={schema.description} />
          </CardContent>
          <Property
            forceRender
            label={app.menuTabs}
          />
        </CardMain>
        <Property
          forceRender
          label={app.currentTab}
        />
      </Container>
    </TabbarProvider>
  );
};

PersonFull.type = [
  schema.Person,
  foaf.Person,
];

PersonFull.topology = fullResourceTopology;

export default register(PersonFull);
