import * as schema from '@ontologies/schema';
import {
  FC,
  register,
  useProperty,
} from 'link-redux';
import React from 'react';

import { CallToActionButton as CallToActionButtonComponent } from '../../../components/SalesWebsite/CallToActionButton';
import ontola from '../../../ontology/ontola';
import sales from '../../../ontology/sales';
import { allTopologies } from '../../../topologies';

export interface CallToActionButtonProps {
  size?: 'small' | 'medium' | 'large';
  trackingId?: string;
}

const CallToActionButton: FC<CallToActionButtonProps> = ({ size, trackingId }) => {
  const [text] = useProperty(schema.text);
  const [href] = useProperty(ontola.href);

  return (
    <CallToActionButtonComponent
      size={size ?? 'small'}
      text={text?.value}
      trackingId={trackingId}
      url={href?.value}
    />
  );
};

CallToActionButton.type = sales.CallToActionButton;
CallToActionButton.topology = allTopologies;

export default register(CallToActionButton);
