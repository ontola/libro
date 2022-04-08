import {
  FC,
  Property,
  register,
  useIds,
  useStrings,
} from 'link-redux';
import React from 'react';
import * as schema from '@ontologies/schema';

import { CallToAction } from '../../../components/SalesWebsite/CallToAction';
import sales from '../../../ontology/sales';
import { allTopologies } from '../../../topologies';

export interface CallToActionBlockProps {
  trackingId?: string;
}

const CallToActionBlock: FC<CallToActionBlockProps> = ({ trackingId }) => {
  const [callToActionBackgroundImage] = useIds(schema.image);
  const [callToActionText] = useIds(schema.text);
  const [callToActionTitle] = useStrings(schema.name);

  return (
    <CallToAction
      imageUrl={callToActionBackgroundImage.value}
      text={callToActionText}
      title={callToActionTitle}
    >
      <Property
        label={sales.callToAction}
        size="large"
        trackingId={trackingId}
      />
    </CallToAction>
  );
};

CallToActionBlock.type = sales.CallToActionBlock;
CallToActionBlock.topology = allTopologies;

export default register(CallToActionBlock);
