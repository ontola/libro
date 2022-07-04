import { makeStyles } from '@mui/styles';
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

import org from '../../../../ontology/org';
import { LibroTheme } from '../../../Common/theme/types';
import AllWithProperty from '../../../Common/components/AllWithProperty';
import SubSection from '../../../Common/components/SubSection';
import ContentDetails from '../../../Common/topologies/ContentDetails';
import { fullResourceTopology } from '../../../Common/topologies/FullResource';
import MainBody from '../../../Common/topologies/MainBody';
import ontola from '../../../Core/ontology/ontola';

const useStyles = makeStyles((theme: LibroTheme) => ({
  image: {
    backgroundSize: 'cover',
    border: `1px solid ${theme.palette.grey.light}`,
    borderRadius: '2.5rem',
    flexShrink: 0,
    height: '5rem',
    marginRight: '0.5625rem',
    width: '5rem',
  },
  shrinker: {
    flexShrink: 1,
  },
  wrapper: {
    display: 'flex',
    paddingBottom: '1rem',
  },
}));

const PersonFull: FC = () => {
  const classes = useStyles();
  const [settingsMenu] = useGlobalIds(ontola.settingsMenu);

  return (
    <React.Fragment>
      <MainBody>
        <div className={classes.wrapper}>
          <Property label={schema.image}>
            <Property label={schema.thumbnail}>
              {([src]: SomeTerm[]) => (
                <div
                  className={classes.image}
                  style={{ backgroundImage: `url("${src.value}")` }}
                />
              )}
            </Property>
          </Property>
          <div className={classes.shrinker}>
            <Property label={[schema.name, rdfs.label, foaf.name]} />
            <ContentDetails>
              <AllWithProperty label={org.organization} />
            </ContentDetails>
          </div>
        </div>
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
