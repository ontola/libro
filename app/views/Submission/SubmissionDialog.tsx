import { NamedNode, isNamedNode } from '@ontologies/core';
import * as schema from '@ontologies/schema';
import {
  FC,
  Property,
  register,
  useDataFetching,
  useProperty,
  useResourceProperty,
} from 'link-redux';
import React from 'react';
import { FormattedMessage } from 'react-intl';

import Button from '../../components/Button';
import useAction from '../../hooks/useAction';
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
  const [submitAction, submitActionStatus] = useAction(subject, ontola.submitAction);
  const [survey] = useProperty(schema.isPartOf) as NamedNode[];
  useDataFetching(survey);
  const [externalIRI] = useResourceProperty(survey, argu.externalIRI);

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

  if (!submitActionStatus || !isNamedNode(submitAction) || !externalIRI) {
    return null;
  }

  return (
    <Property label={schema.isPartOf}>
      <Property
        label={argu.externalIRI}
        submitAction={submitAction}
        onClose={onDone}
      />
    </Property>
  );
};

SubmissionDialog.type = argu.Submission;

SubmissionDialog.topology = alertDialogTopology;

export default register(SubmissionDialog);
