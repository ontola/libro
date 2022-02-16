import {
  FC,
  register,
} from 'link-redux';
import React from 'react';
import { FormattedMessage, useIntl } from 'react-intl';

import Button, { ButtonTheme } from '../../../components/Button';
import dexes from '../../../ontology/dexes';
import { tableCellTopology } from '../../../topologies/TableCell';
import { messages } from '../messages';

const DatasetTableCell: FC = ({
  subject,
}) => {
  const intl = useIntl();

  return (
    <Button
      href={subject.value}
      icon="check"
      theme={ButtonTheme.Subtle}
      title={intl.formatMessage(messages.showPublication)}
    >
      <FormattedMessage {...messages.published} />
    </Button>
  );
};

DatasetTableCell.type = dexes.Dataset;

DatasetTableCell.topology = tableCellTopology;

export default register(DatasetTableCell);
