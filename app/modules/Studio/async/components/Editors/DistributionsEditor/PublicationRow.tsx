import Button from '@material-ui/core/Button';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import LinkOffIcon from '@material-ui/icons/LinkOff';
import { useLRS } from 'link-redux';
import React from 'react';
import { FormattedMessage, useIntl } from 'react-intl';

import useJSON from '../../../../../../hooks/useJSON';
import { studioDistributionMessages } from '../../../../../../translations/messages';
import {
  DistributionMeta,
  Publication,
  buildDistributionIri,
  unMountDistribution,
} from '../../../lib/distributionAgent';

export interface PublicationRowProps {
  publication: Publication;
  projectIri: string;
  onUnmount: () => void;
}

export const PublicationRow: React.FC<PublicationRowProps> = ({
  publication,
  projectIri,
  onUnmount,
}) => {
  const lrs = useLRS();
  const intl = useIntl();
  const distributionIri = buildDistributionIri(projectIri, publication.distributionId);

  const [distribution] = useJSON<DistributionMeta>(`${distributionIri}/meta`);

  const handleUnMount = React.useCallback(() => {
    unMountDistribution(distributionIri, new URL(publication.startRoute)).then((success) => {
      if (!success) {
        lrs.actions.ontola.showSnackbar(intl.formatMessage(studioDistributionMessages.unmountError, {
          route: publication.startRoute,
        }));

        return;
      }

      lrs.actions.ontola.showSnackbar(intl.formatMessage(studioDistributionMessages.unmountSuccess, {
        route: publication.startRoute,
      }));

      onUnmount();
    });
  }, [distributionIri, publication]);

  return (
    <TableRow>
      <TableCell colSpan={2}>
        {publication.startRoute}
      </TableCell>
      <TableCell>
        {distribution ? `v${distribution.version}` : '...'}
      </TableCell>
      <TableCell>
        <Button
          color="secondary"
          startIcon={<LinkOffIcon />}
          onClick={handleUnMount}
        >
          <FormattedMessage {...studioDistributionMessages.actionUnmount} />
        </Button>
      </TableCell>
    </TableRow>
  );
};
