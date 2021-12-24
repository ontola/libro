import { makeStyles } from '@material-ui/styles';
import { SomeTerm, isLiteral } from '@ontologies/core';
import { Resource } from 'link-redux';
import React from 'react';

const useStyles = makeStyles({
  fieldListElement: {
    alignItems: 'center',
    cursor: 'pointer',
    display: 'flex',
    flexDirection: 'row',
    padding: '0 2px',
  },
});

export const renderOption = (item: SomeTerm): JSX.Element => {
  const classes = useStyles();

  if (isLiteral(item.termType)) {
    return (
      <option
        className={classes.fieldListElement}
        key={item.value}
        value={item.value}
      >
        {item.value}
      </option>
    );
  }

  return (
    <Resource
      element="div"
      key={item.value}
      subject={item}
    />
  );
};
