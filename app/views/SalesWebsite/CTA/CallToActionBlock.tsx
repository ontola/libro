import {
  FC,
  Property,
  register,
  useProperty,
} from 'link-redux';
import React from 'react';

import { CallToAction } from '../../../components/SalesWebsite/CallToAction';
import sales from '../../../ontology/sales';
import { allTopologies } from '../../../topologies';

const CallToActionBlock: FC = () => {
  const [callToActionBackgroundImage] = useProperty(sales.callToActionBackgroundImage);
  const [callToActionText] = useProperty(sales.callToActionText);
  const [callToActionTitle] = useProperty(sales.callToActionTitle);

  return (
    <CallToAction
      imageUrl={callToActionBackgroundImage.value}
      subtitle={callToActionText.value}
      title={callToActionTitle.value}
    >
      <Property label={sales.callToAction} size="large" />
    </CallToAction>
  );
};

CallToActionBlock.type = sales.CallToActionBlock;
CallToActionBlock.topology = allTopologies;

export default register(CallToActionBlock);
