import {
  FC,
  register,
  useIds,
  useStrings,
} from 'link-redux';
import * as schema from '@ontologies/schema';
import React from 'react';
import FontAwesome from 'react-fontawesome';

import elements from '../../ontology/elements';
import { allTopologies } from '../../topologies';
import Button, { ButtonVariant } from '../../components/Button';
import argu from '../../ontology/argu';

const ElementsButton: FC = () => {
  const [text] = useStrings(schema.text);
  const [trackingId] = useStrings(argu.trackingId);
  const [variant] = useStrings(elements.variant);
  const [color] = useStrings(elements.color);
  const [icon] = useStrings(schema.image);
  const [iconPosition] = useStrings(elements.iconPosition);
  const [href] = useIds(elements.href);

  const endIcon = React.useMemo(() => iconPosition !== 'end' ?
    null : (
      <FontAwesome
        name={icon}
      />
    ), [iconPosition, icon]);

  return (
    <Button
      color={color}
      endIcon={endIcon}
      href={href?.value}
      icon={iconPosition === 'start' ? icon : undefined}
      variant={variant as ButtonVariant}
      {...(trackingId ? { id: trackingId } : {})}
    >
      {text}
    </Button>
  );
};

ElementsButton.type = elements.Button;
ElementsButton.topology = allTopologies;

export default register(ElementsButton);
