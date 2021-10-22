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

import Button from '../../components/Button';
import useActionStatus from '../../hooks/useActionStatus';
import Flow from '../../modules/Flow/topologies/Flow';
import argu from '../../ontology/argu';
import ontola from '../../ontology/ontola';
import { alertDialogTopology } from '../../topologies/Dialog';
import { surveyMessages } from '../../translations/messages';

const style = { padding: '0.5rem 0' };

export interface SubmissionDialogProps {
  onDone: () => void;
}

const SubmissionDialog: FC<SubmissionDialogProps> = ({
  subject,
  onDone,
}) => {
  const [submitAction, submitActionStatus] = useActionStatus(subject, ontola.submitAction);
  const [externalIRI] = useIds(dig(schema.isPartOf, argu.externalIRI));

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
        responseCallback={onDone}
        subject={submitAction}
      />
    </Flow>
  );
};

SubmissionDialog.type = argu.Submission;

SubmissionDialog.topology = alertDialogTopology;

export default register(SubmissionDialog);
