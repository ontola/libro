import {
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { makeStyles } from '@mui/styles';
import React from 'react';
import { FormattedMessage } from 'react-intl';

import { studioDistributionMessages } from '../../../../../../translations/messages';
import { Action } from '../../../context/ProjectContext';

import { DistributionRow } from './DistributionRow';

interface DistributionsTableProps {
  dispatch: React.Dispatch<Action>;
  distributions: string[];
  onNewDistributionClick: () => void;
}

const useStyles = makeStyles({
  flex: {
    alignItems: 'center',
    display: 'flex',
    gap: '1rem',
  },
  header: {
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'space-between',
    padding: '1rem',
  },
  heading: {
    fontSize: '2rem',
  },
});

export const DistributionsTable: React.FC<DistributionsTableProps> = ({
  dispatch,
  distributions,
  onNewDistributionClick,
}) => {
  const classes = useStyles();

  return (
    <React.Fragment>
      <div className={classes.header}>
        <Typography
          className={classes.heading}
          variant="h2"
        >
          <FormattedMessage {...studioDistributionMessages.distributionsHeading} />
        </Typography>
        <IconButton
          onClick={onNewDistributionClick}
        >
          <AddIcon />
        </IconButton>
      </div>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>
              <FormattedMessage {...studioDistributionMessages.tableHeadingVersion} />
            </TableCell>
            <TableCell>
              <FormattedMessage {...studioDistributionMessages.tableHeadingCreatedAt} />
            </TableCell>
            <TableCell>
              <FormattedMessage {...studioDistributionMessages.tableHeadingDescription} />
            </TableCell>
            <TableCell>
              <FormattedMessage {...studioDistributionMessages.tableHeadingActions} />
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {distributions.map((dist) => (
            <DistributionRow
              dispatch={dispatch}
              distIri={dist}
              key={dist}
            />
          ))}
        </TableBody>
      </Table>
    </React.Fragment>
  );
};
