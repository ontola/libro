import IconButton from '@material-ui/core/IconButton';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import AddIcon from '@material-ui/icons/Add';
import { makeStyles } from '@material-ui/styles';
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
