import { makeStyles } from '@material-ui/styles';
import { LinkedPropType } from 'link-redux';
import React from 'react';

import { LibroTheme } from '../../themes/themes';

export interface MenuSectionLabelProps {
  linkedProp: Exclude<LinkedPropType, any[]>;
  name?: React.ReactNode;
}

const useStyles = makeStyles<LibroTheme>((theme) => ({
  menuSectionLabel: {
    alignItems: 'center',
    display: 'flex',
    marginTop: '.7em',
  },
  menuSectionLabelBar: {
    backgroundColor: theme.palette.transparent.light,
    flex: 1,
    height: '2px',
  },
  menuSectionLabelText: {
    display: 'block',
    flex: 1,
    fontSize: '.8em',
    fontWeight: 'bold',
    letterSpacing: '.1em',
    paddingLeft: '.1em',
    textAlign: 'center',
    textTransform: 'uppercase',
    width: '100%',
  },
}));

const MenuSectionLabel = ({ linkedProp, name }: MenuSectionLabelProps): JSX.Element => {
  const classes = useStyles();

  return (
    <div
      className={classes.menuSectionLabel}
      data-test="MenuSection-MenuSectionLabel"
    >
      <div className={classes.menuSectionLabelBar} />
      <div className={classes.menuSectionLabelText}>
        {name ?? linkedProp.value}
      </div>
      <div className={classes.menuSectionLabelBar} />
    </div>
  );
};

export default MenuSectionLabel;
