import { Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { isNode } from '@ontologies/core';
import { Resource } from 'link-redux';
import React, { ChildrenProp } from 'react';

import { BreakPoints, LibroTheme } from '../../../Kernel/lib/themes';
import { CallToActionButton } from '../CallToActionButton';

import type { HeaderProps } from './HeaderProps';

const useStyles = makeStyles<LibroTheme, Partial<HeaderProps>>((theme) => ({
  button: {
    backgroundColor: theme.palette.secondary.main,
    color: theme.palette.secondary.contrastText,
    fontSize: 18,
  },
  gradient: {
    background: `linear-gradient(0deg, ${theme.palette.background.default}, 10%, ${theme.palette.background.default}, rgba(255, 255, 255, 0));`,
    height: '50px',
    position: 'relative',
    width: '100%',
  },
  header: {
    alignItems: 'center',
    backgroundAttachment: 'fixed',
    backgroundColor: theme.palette.background.default,
    backgroundImage: ({ backgroundImageUrl }) => `url(${backgroundImageUrl})`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',

    [theme.breakpoints.down(BreakPoints.Small)]: {
      backgroundAttachment: 'unset',
      backgroundImage: ({ backgroundImageUrlMobile }) => `url(${backgroundImageUrlMobile})`,
    },

    [theme.breakpoints.up(BreakPoints.XLarge)]: {
      backgroundImage: ({ backgroundImageXL }) => `url(${backgroundImageXL}) !important`,
    },
  },
  spacer: {
    margin: 50,
    [theme.breakpoints.down(BreakPoints.Medium)]: {
      margin: 30,
    },
  },
  subtitle: {
    maxWidth: '40rem',
    paddingBottom: '2rem',
    paddingLeft: '2rem',
    paddingRight: '2rem',
    textAlign: 'center',
  },
  title: {
    [theme.breakpoints.down(BreakPoints.Medium)]: {
      fontSize: '2rem',
    },
    fontSize: '3rem',
    marginTop: '8rem',
    maxWidth: '16em',
    textAlign: 'center',
  },
}));

export const Header: React.FC<HeaderProps & ChildrenProp> = ({
  backgroundImageUrl,
  backgroundImageUrlMobile,
  backgroundImageXL,
  buttonLink,
  buttonText,
  title,
  subtitle,
  children,
}) => {
  const classes = useStyles({
    backgroundImageUrl,
    backgroundImageUrlMobile,
    backgroundImageXL,
  });

  const subtitleNode = React.useMemo(() => {
    if (typeof subtitle === 'string') {
      return (
        <Typography
          className={classes.subtitle}
          component="p"
          variant="subtitle1"
        >
          {subtitle}
        </Typography>
      );
    } else if (isNode(subtitle)) {
      return (
        <div className={classes.subtitle}>
          <Resource subject={subtitle} />
        </div>
      );
    }

    return <div className={classes.spacer} />;
  }, [classes, subtitle]);

  return (
    <div className={classes.header}>
      <Typography
        className={classes.title}
        variant="h1"
      >
        {title}
      </Typography>
      {subtitleNode}
      {buttonText && (
        <CallToActionButton
          text={buttonText}
          url={buttonLink!}
        />
      )}
      {children}
      <div className={classes.gradient} />
    </div>
  );
};
