import { FC, register } from 'link-redux';
import React from 'react';

import form from '../../Form/ontology/form';
import FlowForm from '../components/FlowForm';
import { flowTopology } from '../topologies/Flow';

const FormFlow: FC = () => (
  <FlowForm />
);

FormFlow.type = form.Form;

FormFlow.topology = flowTopology;

export default register(FormFlow);
