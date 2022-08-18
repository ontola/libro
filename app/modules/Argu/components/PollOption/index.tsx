import { RadioButtonUnchecked } from '@mui/icons-material';
import {
  FormControlLabel,
  Radio,
  Typography,
} from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import LinearProgress from '@mui/material/LinearProgress';
import { makeStyles } from '@mui/styles';
import rdf from '@ontologies/core';
import * as schema from '@ontologies/schema';
import { SomeNode } from 'link-lib';
import {
  Resource,
  useDataFetching,
  useLRS,
  useStrings,
} from 'link-redux';
import React from 'react';
import { FormattedMessage } from 'react-intl';

import { entityIsLoaded } from '../../../Kernel/lib/data';
import { LibroTheme } from '../../../Kernel/lib/themes';
import useCounts from '../../hooks/votes/useCounts';
import useVoteHandler from '../../hooks/votes/useVoteHandler';
import useVoteAction from '../../hooks/votes/useVoteAction';
import { voteMessages } from '../../lib/messages';
import argu from '../../ontology/argu';

interface PollOptionProps {
  createAction: SomeNode;
  currentOption: SomeNode;
  currentVote: SomeNode;
  option: SomeNode;
  totalCount: number;
}

const useLabelStyles = makeStyles(() => ({
  label: {
    width: '15em',
  },
  root: {
    marginRight: '0.5em',
  },
}));

const useProgressStyles = makeStyles<LibroTheme>((theme) => ({
  bar: {
    backgroundColor: theme.palette.primary.main,
    opacity: 0.3,
  },
  root: {
    backgroundColor: 'unset',
    border: `1px solid ${theme.palette.primary.main}`,
    borderRadius: '0.3em',
    height: '1.5em',
  },
}));

const useStyles = makeStyles<LibroTheme>((theme) => ({
  loader: {
    margin: '0.2em',
  },
  progressLabel: {
    fontSize: theme.typography.fontSizes.small,
    marginLeft: '0.5em',
    position: 'absolute',
    top: 0,
  },
  progressWrapper: {
    position: 'relative',
  },
  voteCount: {
    color: theme.palette.grey.main,
    display: 'inline-block',
    fontSize: theme.typography.fontSizes.small,
  },
  wrapper: {
    marginTop: '0.5em',
  },
}));

const PollOption = ({
  createAction,
  currentOption,
  currentVote,
  option,
  totalCount,
}: PollOptionProps): JSX.Element | null => {
  const lrs = useLRS();
  const classes = useStyles();
  const labelClasses = useLabelStyles();
  const progressClasses = useProgressStyles();
  useDataFetching(option);
  const [count] = useCounts([option]);
  const active = rdf.equals(currentOption, option);
  const {
    action,
    expired,
    target,
    tooltip,
  } = useVoteAction(createAction, active, currentVote);
  const [handleClick, loading] = useVoteHandler(action, option, currentOption);

  const [name] = useStrings(option, schema.name);
  const voted = !rdf.equals(currentOption, argu.abstain);
  const progress = totalCount === 0 ? 0 : (100 * (count / totalCount));

  if (!entityIsLoaded(lrs, action)) {
    return <Resource subject={action} />;
  }

  if (!entityIsLoaded(lrs, option)) {
    return <Resource subject={option} />;
  }

  if (!target) {
    return null;
  }

  const icon = loading ? (
    <CircularProgress
      className={classes.loader}
      size="1.1em"
    />
  ) : <RadioButtonUnchecked />;

  return (
    <div className={classes.wrapper}>
      <FormControlLabel
        checked={active}
        classes={labelClasses}
        control={<Radio icon={icon} />}
        disabled={expired}
        label={(
          <div className={classes.progressWrapper}>
            <LinearProgress
              classes={progressClasses}
              value={progress}
              variant="determinate"
            />
            <Typography
              className={classes.progressLabel}
            >
              {name}
            </Typography>
          </div>
        )}
        title={tooltip ?? name}
        value={option.value}
        onClick={handleClick}
      />
      {voted && count > 0 && (
        <div className={classes.voteCount}>
          <FormattedMessage
            {...voteMessages.voteCounts}
            values={{ count }}
          />
        </div>
      )}
    </div>
  );
};

export default PollOption;
