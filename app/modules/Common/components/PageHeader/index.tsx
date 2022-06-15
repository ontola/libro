import { makeStyles } from '@mui/styles';
import * as rdfx from '@ontologies/rdf';
import * as rdfs from '@ontologies/rdfs';
import * as schema from '@ontologies/schema';
import {
  Property,
  useDataFetching,
  useIds,
  useLiterals,
} from 'link-redux';
import React from 'react';

import argu from '../../../Argu/ontology/argu';
import ontola from '../../../../ontology/ontola';
import { LibroTheme } from '../../../../themes/themes';
import DetailsBar from '../../../../topologies/DetailsBar';
import { defaultMenus } from '../../lib/viewHelpers';
import LinkedDetailDate from '../LinkedDetailDate';

import { CoverPhoto } from './coverPhoto';

export interface PageHeaderProps {
  detailsBarChildren?: React.ReactNode;
}

const BOTTOM_MARGIN = 8;

const useStyles = makeStyles<LibroTheme>((theme) => ({
  coverPhoto: {
    marginBottom: theme.spacing(BOTTOM_MARGIN),
  },
  title: {
    fontSize: '1.1rem',
  },
}));

export const PageHeader = ({ detailsBarChildren }: PageHeaderProps): JSX.Element => {
  const classes = useStyles();

  const [coverPhoto] = useIds(ontola.coverPhoto);
  useDataFetching(coverPhoto);
  const [imagePositionY] = useLiterals(coverPhoto, ontola.imagePositionY);
  const [url] = useIds(coverPhoto, ontola.imgUrl1500x2000);

  const defaultItems = (
    <React.Fragment>
      <Property label={schema.creator} />
      <Property label={rdfx.type} />
      <LinkedDetailDate />
      <Property label={argu.pinnedAt} />
      <Property label={argu.expiresAt} />
      <Property label={argu.followsCount} />
      <Property label={argu.motionsCount} />
      <Property label={argu.grantedGroups} />
    </React.Fragment>
  );

  return (
    <React.Fragment>
      <DetailsBar
        layoutOnly
        right={defaultMenus}
      >
        {detailsBarChildren ?? defaultItems}
      </DetailsBar>
      <span className={classes.title}>
        <Property label={[schema.name, rdfs.label]} />
      </span>
      {url && (
        <div className={classes.coverPhoto}>
          <CoverPhoto
            imagePositionY={imagePositionY?.value}
            url={url?.value}
          />
        </div>
      )}
    </React.Fragment>
  );
};
