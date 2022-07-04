import { lighten } from '@mui/material/styles';
import { makeStyles } from '@mui/styles';
import clsx from 'clsx';
import { SomeNode, normalizeType } from 'link-lib';
import { Resource } from 'link-redux';
import React from 'react';
import FontAwesome from 'react-fontawesome';

import { BreakPoints, LibroTheme } from '../../Common/theme/types';
import Link from '../../Common/components/Link';

const LIST_LEFT_MARGIN = 14;
const LIST_LEFT_MARGIN_MOBILE = 7;
const ASIDE_BOTTOM_MARGIN = 4;
const ASIDE_PADDING = 4;
const ASIDE_LIGHTEN_AMOUNT = 0.8;
const ASIDE_ICON_PADDING_RIGHT = 2;

export interface FertileComponentProps {
  children: SomeNode,
  href?: string,
  listVariant?: ListVariant,
  color?: string,
  trackingId?: string,
}

export enum FertileComponentVariant {
  Note,
  Tip,
}

export enum ListVariant {
  Pro = 'pro',
  Con = 'con',
}

const useStyles = makeStyles<LibroTheme, Partial<FertileComponentProps>>((theme) => ({
  a: {
    '& img': {
      borderRadius: theme.shape.borderRadius,
      padding: '.4rem',
      transition: 'background-color 100ms',
    },
    '& img:hover': {
      backgroundColor: 'rgba(212, 212, 212, 20%)',
    },
    '&:hover': {
      color: theme.palette.primary.dark,
    },
    color: theme.palette.primary.main,
    textDecoration: 'underline',
  },

  aside: {
    '& p': {
      maxWidth: 'unset',
    },
    backgroundColor: ({ color }) => lighten(color ?? theme.palette.secondary.main, ASIDE_LIGHTEN_AMOUNT),
    fontSize: '1rem',
    marginBottom: theme.spacing(ASIDE_BOTTOM_MARGIN),
    marginTop: '16px',
    padding: theme.spacing(ASIDE_PADDING),
    width: 'clamp(30ch, 100%, 100ch)',
  },

  asideIcon: {
    color: ({ color }) => color ?? theme.palette.secondary.main,
    paddingRight: theme.spacing(ASIDE_ICON_PADDING_RIGHT),
  },
  con: {
    '&::marker': {
      color: '#C91729 !important',
      fontWeight: theme.typography.fontWeightBold,
    },
    color: '#C91729',
    listStyleType: "'-  '",
  },
  li: {
    '&::marker': {
      color: theme.palette.primary.light,
      fontSize: '1.2rem',
    },
  },

  list: {
    [theme.breakpoints.down(BreakPoints.Medium)]: {
      marginLeft: theme.spacing(LIST_LEFT_MARGIN_MOBILE),
    },
    '& li p': {
      display: 'block',
      marginBlock: '5px',
    },
    listStylePosition: 'outside',
    marginLeft: theme.spacing(LIST_LEFT_MARGIN),
  },

  note: {
    borderColor: ({ color }) => color ?? theme.palette.secondary.main,
    borderLeft: '5px solid',
  },

  ol: {
    listStyleType: 'decimal',
  },
  pro: {
    '&::marker': {
      color: '#00882C',
      fontWeight: theme.typography.fontWeightBold,
    },
    color: '#00882C',
    listStyleType: "'+  '",
  },
  tip: {
    display: 'flex',
  },

  ul: {
    listStyleType: 'disc',
  },
}));

const elementMap = new Map<string, React.ElementType>([
  ['a', Link],
  ['aside', 'div'],
]);

export const createFertileComponent = (Elem: string, variant?: FertileComponentVariant) => ({
  children,
  color,
  href,
  listVariant,
  trackingId,
}: FertileComponentProps): JSX.Element => {
  const classes = useStyles({ color });
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
    [classes.pro]: listVariant === ListVariant.Pro,
    [classes.con]: listVariant === ListVariant.Con,
  });

  const WrapperEl = variant === FertileComponentVariant.Tip ? 'span' : React.Fragment;

  const componentAttributes = Elem === 'a' ?
    {
      allowExternal: false,
      id: trackingId,
      to: href,
    } : {};

  const Comp = elementMap.get(Elem) ?? Elem;

  return (
    // @ts-ignore
    <Comp
      className={className}
      {...componentAttributes}
    >
      {variant === FertileComponentVariant.Tip && (
        <FontAwesome
          className={classes.asideIcon}
          name="lightbulb-o"
          size="2x"
        />
      )}
      <WrapperEl>
        {normalizeType(children).map((child) => (
          <Resource
            key={child.value}
            subject={child}
          />
        ))}
      </WrapperEl>
    </Comp>
  );
};
