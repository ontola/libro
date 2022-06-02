import * as schema from '@ontologies/schema';
import {
  FC,
  Resource,
  register,
  useIds,
  useStrings,
} from 'link-redux';
import React from 'react';
import FontAwesome from 'react-fontawesome';

import { allTopologies } from '../../../topologies';
import argu from '../../Argu/ontology/argu';
import Button, { ButtonVariant } from '../../Common/components/Button';
import elements from '../ontology/elements';

const ElementsButton: FC = (props) => {
  const [text] = useStrings(schema.text);
  const [trackingId] = useStrings(argu.trackingId);
  const [variant] = useStrings(elements.variant);
  const [color] = useStrings(elements.color);
  const [icon] = useStrings(schema.image);
  const [iconPosition] = useStrings(elements.iconPosition);
  const [href] = useIds(elements.href);
  const [children] = useIds(elements.children);

  const endIcon = React.useMemo(() => iconPosition !== 'end' ?
    null : (
      <FontAwesome
        data-testid="button-end-icon"
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
      ref={props.innerRef}
    >
      {props.children ?? (children ? <Resource subject={children} /> : text)}
    </Button>
  );
};

ElementsButton.type = elements.Button;
ElementsButton.topology = allTopologies;

export default register(ElementsButton);
