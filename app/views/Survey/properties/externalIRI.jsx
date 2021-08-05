import * as schema from '@ontologies/schema';
import {
  Resource,
  linkedPropType,
  register,
  useDataFetching,
  useLRS,
  useProperty,
  useResourceProperty,
} from 'link-redux';
import React from 'react';
import { useIntl } from 'react-intl';

import CardDivider from '../../../components/Card/CardDivider';
import Typeform from '../../../containers/Typeform';
import argu from '../../../ontology/argu';
import ontola from '../../../ontology/ontola';
import { allTopologies } from '../../../topologies';
import { surveyMessages } from '../../../translations/messages';

const style = { paddingTop: '0.5rem' };
const displayNoneStyle = { display: 'none' };

const ExternalIRI = ({ linkedProp }) => {
  const intl = useIntl()
  const lrs = useLRS();
  const [createSubmissionAction] = useProperty(ontola.createSubmissionAction);
  useDataFetching(createSubmissionAction);
  const [actionStatus] = useResourceProperty(createSubmissionAction, schema.actionStatus);

  if (actionStatus && actionStatus !== schema.PotentialActionStatus) {
    return (
      <React.Fragment>
        <CardDivider />
        <div style={style}>
          {intl.formatMessage(surveyMessages.thankyouMessage)}
        </div>
      </React.Fragment>
    );
  }

  if (!createSubmissionAction) {
    return null;
  }

  if (!actionStatus || !createSubmissionAction) {
    return <Resource subject={createSubmissionAction} />;
  }

  return (
    <Typeform
      popup
      style={displayNoneStyle}
      url={linkedProp.value}
      onSubmit={() => lrs.exec(createSubmissionAction)}
    />
  );
};

ExternalIRI.type = argu.Survey;

ExternalIRI.topology = allTopologies;

ExternalIRI.property = argu.externalIRI;

ExternalIRI.propTypes = {
  linkedProp: linkedPropType,
};

export default register(ExternalIRI);
