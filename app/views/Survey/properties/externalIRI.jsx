import schema from '@ontologies/schema';
import {
  Resource,
  linkedPropType,
  register,
  useDataFetching,
  useDataInvalidation,
  useLRS,
  useProperty,
  useResourceProperty,
} from 'link-redux';
import React from 'react';

import CardContent from '../../../components/Card/CardContent';
import CardDivider from '../../../components/Card/CardDivider';
import argu from '../../../ontology/argu';
import ontola from '../../../ontology/ontola';
import { allTopologies } from '../../../topologies';
import Typeform from '../../../containers/Typeform';

const ExternalIRI = ({ linkedProp }) => {
  const lrs = useLRS();
  const [createSubmissionAction] = useProperty(ontola.createSubmissionAction);
  const lastUpdate = useDataInvalidation({ subject: createSubmissionAction });
  useDataFetching({ subject: createSubmissionAction }, lastUpdate);
  const [actionStatus] = useResourceProperty(createSubmissionAction, schema.actionStatus);
  if (actionStatus && actionStatus !== schema.PotentialActionStatus) {
    return (
      <React.Fragment>
        <CardDivider />
        <CardContent endSpacing>Bedankt voor je bijdrage!</CardContent>
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
      style={{ display: 'none' }}
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