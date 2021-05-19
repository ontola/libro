import React from 'react';
import { normalizeType } from 'link-lib';
import { isNode } from '@ontologies/core';
import { Resource } from 'link-redux';
import { makeStyles } from '@material-ui/styles';
import { darken, lighten } from '@material-ui/core/styles';
import clsx from 'clsx';
import FontAwesome from 'react-fontawesome';

import { LibroTheme } from '../../themes/themes';

const LIST_LEFT_MARGIN = 6;
const ASIDE_BOTTOM_MARGIN = 4;
const ASIDE_PADDING = 4;
const ASIDE_LIGHTEN_AMOUNT = 0.8;
const ASIDE_ICON_PADDING_RIGHT = 2;
const LINK_COLOR_DARKEN_AMOUNT = .2;

export interface FertileComponentProps {
  children: React.ReactNode,
  href?: string,
}

export enum FertileComponentVariant {
  Note,
  Tip,
}

const useStyles = makeStyles<LibroTheme>((theme) => ({
  a: {
    '&:hover': {
      textDecoration: 'underline',
    },

    color: darken(theme.palette.secondary.main, LINK_COLOR_DARKEN_AMOUNT),
  },

  aside: {
    backgroundColor: lighten(theme.palette.secondary.main, ASIDE_LIGHTEN_AMOUNT),
    fontSize: '0.9rem',
    marginBottom: theme.spacing(ASIDE_BOTTOM_MARGIN),
    padding: theme.spacing(ASIDE_PADDING),
    width: 'clamp(30ch, 100%, 90ch)',
  },

  asideIcon: {
    color: theme.palette.secondary.main,
    paddingRight: theme.spacing(ASIDE_ICON_PADDING_RIGHT),
  },

  li: {
    '&::marker': {
      color: theme.palette.primary.light,
      fontSize: '1.2rem',
    },
  },

  list: {
    '& li p': {
      display: 'inline-block',
    },

    listStylePosition: 'inside',
    marginLeft: theme.spacing(LIST_LEFT_MARGIN),
  },

  note: {
    borderColor: theme.palette.secondary.main,
    borderLeft: '5px solid',
  },

  ol: {
    listStyleType: 'decimal',
  },

  tip: {
    display: 'flex',
  },

  ul: {
    listStyleType: 'disc',
  },
}));

export const createFertileComponent = (Elem: string, variant?: FertileComponentVariant) => ({
  children,
  href,
}: FertileComponentProps): JSX.Element => {
  const classes = useStyles();
  const isList = ['ol', 'ul'].includes(Elem);

  const className = clsx({
    [classes.a]: Elem === 'a',
    [classes.aside]: Elem === 'aside',
    [classes.ol]: Elem === 'ol',
    [classes.ul]: Elem === 'ul',
    [classes.li]: Elem === 'li',
    [classes.list]: isList,
    [classes.note]: variant === FertileComponentVariant.Note,
    [classes.tip]: variant === FertileComponentVariant.Tip,
  });

  const WrapperEl = variant === FertileComponentVariant.Tip ? 'span' : React.Fragment;

  const componentAttributes = Elem === 'a' ?
    {
      href,
      rel: 'noopener noreferrer',
    } : {};

  return (
    // @ts-ignore
    <Elem
      className={className}
      {...componentAttributes}
    >
      {variant === FertileComponentVariant.Tip && <FontAwesome className={classes.asideIcon} name="lightbulb-o" size="2x" />}
      <WrapperEl>
        {isNode(children) ? normalizeType(children).map((child) => <Resource key={child.value} subject={child} />) : children}
      </WrapperEl>
    </Elem>
  );
};
