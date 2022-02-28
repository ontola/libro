import Button from '@material-ui/core/Button';
import Chip from '@material-ui/core/Chip';
import { makeStyles } from '@material-ui/core/styles';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import PublishIcon from '@material-ui/icons/Publish';
import React from 'react';
import { FormattedMessage } from 'react-intl';

import useJSON from '../../../../../../hooks/useJSON';
import { studioDistributionMessages } from '../../../../../../translations/messages';
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
