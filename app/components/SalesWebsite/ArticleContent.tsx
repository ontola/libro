import { ClassNameMap, makeStyles } from '@material-ui/styles';
import { SomeTerm } from '@ontologies/core';
import clsx from 'clsx';
import { Resource } from 'link-redux';
import React from 'react';

import { SalesTheme } from '../../themes/salesWebsite/SalesThemeProvider';

export interface ArticleContentProps {
  classes?: ClassNameMap<string>;
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
      '& + h3': {
        marginTop: '2rem',
      },
      marginTop: '3rem',
    },
    '& h3': {
      fontSize: '1.25rem',
    },
    '& img': {
      maxWidth: '100%',
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
    [theme.breakpoints.down('sm')]: {
      clipPath: 'unset',
      float: 'unset',
      margin: 'auto',
      marginBottom: '1.5rem',
      width: '100%',
    },
  },
  imageWrapper: {
    filter: 'drop-shadow(0px 8px 13px rgba(0, 0, 0, .4))',
    [theme.breakpoints.down('sm')]: {
      filter: 'unset',
    },
  },
}));

export const ArticleContent = ({
  classes,
  image,
  children,
}: React.PropsWithChildren<ArticleContentProps>,
): JSX.Element => {
  const defaultClasses = useStyles();

  const contentClasses = clsx({
    [defaultClasses.content]: true,
    [classes?.content ?? '']: !!classes?.content,
  });

  return (
    <React.Fragment>
      {image && (
        <span className={defaultClasses.imageWrapper}>
          <Resource className={defaultClasses.image} subject={image} />
        </span>
      )}
      <div className={contentClasses}>
        {children}
      </div>
    </React.Fragment>
  );
};
