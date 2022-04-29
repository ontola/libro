import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import React from 'react';
import { FormattedMessage } from 'react-intl';

import { studioDistributionMessages } from '../../../../../../translations/messages';
import { ProjectContext } from '../../../context/ProjectContext';
import { Publication } from '../../../lib/distributionAgent';

import { PublicationRow } from './PublicationRow';

interface PublicationTableProps {
  publications: Publication[] | undefined;
  project: ProjectContext;
  onPublicationsChange: () => void;
}

const useStyles = makeStyles({
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

export const PublicationTable: React.FC<PublicationTableProps> = ({
  publications,
  project,
  onPublicationsChange,
}) => {
  const classes = useStyles();

  return (
    <React.Fragment>
      <div className={classes.header}>
        <Typography
          className={classes.heading}
          variant="h2"
        >
          <FormattedMessage {...studioDistributionMessages.publicationsHeading} />
        </Typography>
      </div>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell colSpan={2}>
              <FormattedMessage {...studioDistributionMessages.tableHeadingRoute} />
            </TableCell>
            <TableCell>
              <FormattedMessage {...studioDistributionMessages.tableHeadingDistribution} />
            </TableCell>
            <TableCell>
              <FormattedMessage {...studioDistributionMessages.tableHeadingActions} />
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {publications && publications.map((publication) => (
            <PublicationRow
              key={publication.startRoute}
              projectIri={project.iri!}
              publication={publication}
              onUnmount={onPublicationsChange}
            />
          ))}
        </TableBody>
      </Table>
    </React.Fragment>
  );
};
