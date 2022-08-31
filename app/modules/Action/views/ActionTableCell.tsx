import * as schema from '@ontologies/schema';
import {
  FC,
  register,
  useProperty,
  useStrings,
} from 'link-redux';
import React from 'react';
import FontAwesome from 'react-fontawesome';

import LDLink from '../../Common/components/LDLink';
import { LinkFeature } from '../../Common/components/Link';
import { useShowDialog } from '../../Common/hooks/useShowDialog';
import { useStrippedMarkdown } from '../../Common/lib/useStrippedMarkdown';
import { tableCellTopology } from '../../Table/topologies';
import useOneClickProps from '../hooks/useOneClickProps';
import { isInvalidActionStatus } from '../hooks/useValidActions';

const ActionTableCell: FC = ({
  subject,
}) => {
  const [actionStatus] = useProperty(schema.actionStatus);
  const [name] = useStrings(schema.name);
  const [error] = useStrings(schema.error);
  const {
    icon,
    loading,
    onClick,
  } = useOneClickProps();
  const showDialog = useShowDialog(subject);

  const invalid = isInvalidActionStatus(actionStatus);
  const title = useStrippedMarkdown(invalid ? error : name);

  return (
    <LDLink
      disabled={invalid || loading}
      features={[LinkFeature.Bold]}
      title={title}
      onClick={onClick ?? showDialog}
    >
      {icon ? (
        <FontAwesome
          name={icon}
          spin={loading}
          title={title}
        />
      ) : title}
    </LDLink>
  );
};

ActionTableCell.type = schema.Action;

ActionTableCell.topology = tableCellTopology;

export default register(ActionTableCell);
