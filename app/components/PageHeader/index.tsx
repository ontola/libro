import { makeStyles } from '@material-ui/styles';
import { Node } from '@ontologies/core';
import * as rdfx from '@ontologies/rdf';
import * as rdfs from '@ontologies/rdfs';
import * as schema from '@ontologies/schema';
import {
  Property,
  useDataInvalidation,
  useProperty,
  useResourceProperty,
} from 'link-redux';
import React from 'react';

import argu from '../../ontology/argu';
import ontola from '../../ontology/ontola';
import { LibroTheme } from '../../themes/themes';
import DetailsBar from '../../topologies/DetailsBar';
import { defaultMenus } from '../../views/common';
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

  const [coverPhoto] = useProperty(ontola.coverPhoto) as Node[];
  useDataInvalidation(coverPhoto);
  const [imagePositionY] = useResourceProperty(coverPhoto, ontola.imagePositionY);
  const [url] = useResourceProperty(coverPhoto, ontola.imgUrl1500x2000);

  const defaultItems = (
    <React.Fragment>
      <Property label={schema.creator} />
      <Property label={rdfx.type} />
      <LinkedDetailDate />
      <Property label={argu.pinnedAt} />
      <Property label={argu.expiresAt} />
      <Property label={argu.followsCount} />
      <Property label={argu.motionsCount} />
      <Property label={schema.location} />
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
