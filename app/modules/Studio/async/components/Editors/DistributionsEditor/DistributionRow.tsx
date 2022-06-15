import PublishIcon from '@mui/icons-material/Publish';
import {
  Button,
  Chip,
  TableCell,
  TableRow,
} from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import React from 'react';
import { FormattedMessage } from 'react-intl';

import { studioDistributionMessages } from '../../../../../../translations/messages';
import useJSON from '../../../../../Common/hooks/useJSON';
import { Action, ProjectAction } from '../../../context/ProjectContext';
import { DistributionMeta } from '../../../lib/distributionAgent';

export interface DistributionRowProps {
  distIri: string;
  dispatch: React.Dispatch<Action>;
}

const useStyles = makeStyles({
  flex: {
    alignItems: 'center',
    display: 'flex',
    gap: '1rem',
  },
});

const dateFormatter = new Intl.DateTimeFormat([], {
  day: 'numeric',
  month: 'long',
  weekday: 'long',
  year: 'numeric',
});

export const DistributionRow: React.FC<DistributionRowProps> = ({ dispatch, distIri }) => {
  const classes = useStyles();
  const [distribution] = useJSON<DistributionMeta>(`${distIri}/meta`);

  const onDeployClick = React.useCallback(() => {
    if (distribution) {
      dispatch({
        distributionToDeploy: {
          ...distribution,
          iri: distIri,
        },
        type: ProjectAction.ShowDeployDialog,
      });
    }
  }, [dispatch, distribution]);

  if (!distribution) {
    return null;
  }

  const {
    version,
    message,
    createdAt,
    live,
  } = distribution;

  return (
    <TableRow>
      <TableCell>
        <div className={classes.flex}>
          <span>
            {`v${version}`}
          </span>
          {live && (
            <Chip
              color="primary"
              label="LIVE"
              size="small"
            />
          )}
        </div>
      </TableCell>
      <TableCell>
        {dateFormatter.format(new Date(createdAt))}
      </TableCell>
      <TableCell>
        {message}
      </TableCell>
      <TableCell>
        <Button
          color="primary"
          startIcon={<PublishIcon />}
          onClick={onDeployClick}
        >
          <FormattedMessage {...studioDistributionMessages.actionDeploy} />
        </Button>
      </TableCell>
    </TableRow>
  );
};
