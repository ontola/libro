import { Collapse, Typography } from '@mui/material';
import ChevronRight from '@mui/icons-material/ChevronRight';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { makeStyles } from '@mui/styles';
import { NamedNode } from '@ontologies/core';
import clsx from 'clsx';
import React from 'react';

import type { ResourceLink } from '../../helpers/link-redux/types';

export type FacetType = ResourceLink<{
  image: NamedNode;
  name: NamedNode;
  text: NamedNode;
}>;

export interface FacetProps {
  current?: boolean;
  onClick: (facet: FacetType) => void;
  facet: FacetType;
}

const useStyles = makeStyles({
  button: {
    alignItems: 'center',
    color: '#000',
    display: 'flex',
    flexDirection: 'row',
    fontFamily: 'Open Sans',
  },
  buttonText: {
    '&:hover': {
      color: '#000',
      cursor: 'pointer',
    },
    color: '#707070',
    fontWeight: 'bold',
    lineHeight: 1.2,
    marginBottom: 0,
    textAlign: 'left',
  },
  buttonTextSelected: {
    color: '#000',
    fontWeight: 'bold',
    lineHeight: 1.2,
    marginBottom: 0,
    textAlign: 'left',
  },
  collapseText: {
    marginLeft: '2rem',
  },
  facetContainer: {
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'row',
    fontFamily: 'Open Sans',
    fontSize: 20,
    lineHeight: 1.2,
  },
  icon: {
    color: '#B33A00',
    fontSize: 30,
  },
});

export const Facet: React.FC<FacetProps> = ({ current, onClick, facet }) => {
  const classes = useStyles();

  const handleClick = React.useCallback(() => {
    onClick(facet);
  }, [onClick, facet]);

  const buttonTextClass = clsx({
    [classes.buttonText]: !current,
    [classes.buttonTextSelected]: current,
  });

  return (
    <div>
      <div className={classes.facetContainer}>
        <button
          className={classes.button}
          type="button"
          onClick={handleClick}
        >
          {current ? (
            <KeyboardArrowDownIcon
              className={classes.icon}
            />
          ) : (
            <ChevronRight
              className={classes.icon}
            />
          )}

          <Typography
            className={buttonTextClass}
            onClick={handleClick}
          >
            {facet.name?.value}
          </Typography>
        </button>
      </div>
      <Collapse in={current}>
        <Typography
          className={classes.collapseText}
          variant="body1"
        >
          {facet.text?.value}
        </Typography>
      </Collapse>
    </div>
  );
};
