import {
  FC,
  register,
  useProperty,
} from 'link-redux';
import React from 'react';
import * as schema from '@ontologies/schema';

import { CallToActionButton as CallToActionButtonComponent } from '../../../components/SalesWebsite/CallToActionButton';
import sales from '../../../ontology/sales';
import ontola from '../../../ontology/ontola';
import { allTopologies } from '../../../topologies';

export interface CallToActionButtonProps {
  size?: 'small' | 'medium' | 'large',
}

const CallToActionButton: FC<CallToActionButtonProps> = ({ size }) => {
  const [text] = useProperty(schema.text);
  const [href] = useProperty(ontola.href);

  return (
    <CallToActionButtonComponent size={size ?? 'small'} text={text?.value} url={href?.value} />
  );
};

CallToActionButton.type = sales.CallToActionButton;
CallToActionButton.topology = allTopologies;

export default register(CallToActionButton);
