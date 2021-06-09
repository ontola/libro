import { makeStyles } from '@material-ui/styles';
import { SomeTerm } from '@ontologies/core';
import { Resource } from 'link-redux';
import React from 'react';

import { SalesTheme } from '../../themes/salesWebsite/SalesThemeProvider';

export interface ArticleContentProps {
  image?: SomeTerm;
}

const useStyles = makeStyles<SalesTheme>((theme) => ({
  content: {
    '& a': {
      '&:hover': {
        color: theme.palette.primary.dark,
      },
      textDecoration: 'underline',
    },
    '& h2': {
      marginTop: '3rem',
    },
    '& li::marker': {
      color: theme.palette.primary.main,
    },
    margin: 'auto',
    marginBottom: '5rem',
    maxWidth: 'min(100%, 90ch)',
  },
  image: {
    clipPath: 'circle(50%)',
    float: 'right',
    height: 'min(400px, 30vw)',
    margin: '1rem',
    objectFit: 'cover',
    width: 'min(400px, 30vw)',
  },
}));

export const ArticleContent = (
  { image, children }: React.PropsWithChildren<ArticleContentProps>,
): JSX.Element => {
  const classes = useStyles();

  return (
    <React.Fragment>
      {image && (
        <Resource className={classes.image} subject={image} />
      )}
      <div className={classes.content}>
        {children}
      </div>
    </React.Fragment>
  );
};
