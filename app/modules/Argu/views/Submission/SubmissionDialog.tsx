import { isNamedNode } from '@ontologies/core';
import * as schema from '@ontologies/schema';
import {
  FC,
  Property,
  Resource,
  dig,
  register,
  useIds,
} from 'link-redux';
import React from 'react';
import { FormattedMessage } from 'react-intl';

import { surveyMessages } from '../../../../translations/messages';
import useActionStatus from '../../../Action/hooks/useActionStatus';
import { OnDoneHandler } from '../../../Action/views/helpers';
import Button from '../../../Common/components/Button';
import { alertDialogTopology } from '../../../Common/topologies/Dialog';
import ontola from '../../../Core/ontology/ontola';
import Flow from '../../../Flow/topologies/Flow';
import argu from '../../lib/argu';

const style = { padding: '0.5rem 0' };

export interface SubmissionDialogProps {
  onDone: OnDoneHandler;
}

const SubmissionDialog: FC<SubmissionDialogProps> = ({
  subject,
  onDone,
}) => {
  const [submitAction, submitActionStatus] = useActionStatus(subject, ontola.submitAction);
  const [externalIRI] = useIds(dig(schema.isPartOf, argu.externalIRI));

  React.useEffect(() => {
    if (submitActionStatus === schema.CompletedActionStatus) {
      onDone(null);
    }
  }, [submitActionStatus]);

  if (submitActionStatus === schema.CompletedActionStatus) {
    return (
      <div style={style}>
        <FormattedMessage {...surveyMessages.thankyouMessage} />
      </div>
    );
  }

  if (submitActionStatus === ontola.ExpiredActionStatus) {
    return (
      <Button disabled>
        <FormattedMessage {...surveyMessages.closedButtonText} />
      </Button>
    );
  }

  if (!submitActionStatus || !isNamedNode(submitAction)) {
    return null;
  }

  if (externalIRI) {
    return (
      <Property label={schema.isPartOf}>
        <Property
          label={argu.externalIRI}
          submitAction={submitAction}
          onClose={onDone}
        />
      </Property>
    );
  }

  return (
    <Flow>
      <Resource
        subject={submitAction}
        onDone={onDone}
      />
    </Flow>
  );
};

SubmissionDialog.type = argu.Submission;

SubmissionDialog.topology = alertDialogTopology;

export default register(SubmissionDialog);
