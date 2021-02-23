import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import React from 'react';

import { builderContext } from './builderContext';

const useStyles = makeStyles({
  toolbar: {
    height: '4rem',
    marginBottom: '1em',
    padding: '.5em',
    width: '100%',
  },
});

const Toolbar: React.FC = () => {
  const classes = useStyles();
  const { index, resources, setIndex } = React.useContext(builderContext);

  return (
    <Paper className={classes.toolbar} elevation={3}>
      <FormControl>
        <InputLabel htmlFor="pagebuilder-resource">
          {`Resource (selected no ${index + 1}/${resources.length})`}
        </InputLabel>
        <Select
          labelId="pagebuilder-resource"
          value={index}
          onChange={(e) => setIndex(Number(e.target.value))}
        >
          {resources.map((resource, i) => (
            <MenuItem key={resource.value} value={i}>
              {resource.value}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Paper>
  );
};

export default Toolbar;
