import {
  Box,
  LinearProgress,
  LinearProgressProps,
  Typography,
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import React from 'react';

const MAX_PERCENTAGE = 99;

const useStyles = makeStyles(() => ({
  line: {
    marginRight: 1,
    width: '100%',
  },
  text: {
    minWidth: 35,
  },
  wrapper: {
    alignItems: 'center',
    display: 'flex',
  },
}));

const UploadProgress = (props: LinearProgressProps & { value: number }): JSX.Element => {
  const classes = useStyles();
  const progress = Math.min(MAX_PERCENTAGE, Math.floor(props.value));

  return (
    <Box className={classes.wrapper}>
      <Box className={classes.line}>
        <LinearProgress
          variant="determinate"
          {...props}
        />
      </Box>
      <Box className={classes.text}>
        <Typography variant="body2">
          {`${progress}%`}
        </Typography>
      </Box>
    </Box>
  );
};

export default UploadProgress;
