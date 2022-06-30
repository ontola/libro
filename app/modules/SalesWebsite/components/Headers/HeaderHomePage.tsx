import { Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { isNode } from '@ontologies/core';
import { Property } from 'link-redux';
import React from 'react';

import {
  BreakPoints,
  LibroTheme,
  Margin, 
} from '../../../../themes/themes';
import Heading, { HeadingSize } from '../../../Common/components/Heading';
import Container from '../../../Common/topologies/Container';
import sales from '../../ontology/sales';

import type { HeaderProps } from './HeaderProps';

const TWO = 2;

const useStyles = makeStyles<LibroTheme, Partial<HeaderProps>>((theme) => ({
  button: {
    backgroundColor: theme.palette.secondary.main,
    color: theme.palette.secondary.contrastText,
    fontSize: 18,
  },
  header: {
    [theme.breakpoints.down(BreakPoints.Medium)]: {
      alignItems: 'start',
      gridTemplateAreas: '"image" "title"',
      marginBottom: theme.spacing(Margin.Large * TWO),
    },
    alignItems: 'center',
    display: 'grid',
    gridTemplateAreas: '"title image"',
    gridTemplateColumns: '1fr auto',
    justifyContent: 'space-between',
    width: '100%',
  },
  image: {
    [theme.breakpoints.up(BreakPoints.Medium)]: {
      maxWidth: 'calc(100% - 4rem)',
      position: 'relative',
      right: '-4rem',
    },
    maxWidth: '100%',
  },
  imageWrapper: {
    gridArea: 'image',
  },
  outerWrapper: {
    [theme.breakpoints.down(BreakPoints.Medium)]: {
      justifyContent: 'start',
    },
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    marginBottom: '4rem',
    marginTop: '4rem',
    maxWidth: '100%',
  },
  spacer: {
    margin: 50,
    [theme.breakpoints.down(BreakPoints.Medium)]: {
      margin: 30,
    },
  },
  subtitle: {
    fontSize: theme.typography.fontSizes.xxxLarge,
    fontWeight: theme.typography.fontWeightBold,
    lineHeight: '1.4',
    maxWidth: '7em',
  },
  title: {
    color: theme.palette.primary.main,
    maxWidth: '16em',
  },
  titleWrapper: {
    gridArea: 'title',
    [theme.breakpoints.up(BreakPoints.Medium)]: {
      minWidth: '25rem',
    },
  },
}));

export const HeaderHomePage: React.FC<HeaderProps> = ({
  backgroundImageUrl,
  backgroundImageUrlMobile,
  backgroundImageXL,
  title,
  subtitle,
}) => {
  const classes = useStyles({
    backgroundImageUrl,
    backgroundImageUrlMobile,
    backgroundImageXL,
  });

  return (
    <Container>
      <div className={classes.outerWrapper}>
        <div className={classes.header}>
          <div className={classes.titleWrapper}>
            <Heading
              className={classes.title}
              size={HeadingSize.XL}
            >
              {title}
            </Heading>
            <Typography
              className={classes.subtitle}
              component="p"
              variant="subtitle1"
            >
              {isNode(subtitle) ? subtitle.value : subtitle}
            </Typography>
            <Property label={sales.callToAction} />
          </div>
          <div className={classes.imageWrapper}>
            <img
              alt=""
              className={classes.image}
              src={backgroundImageUrl}
            />
          </div>
        </div>
      </div>
    </Container>
  );
};
