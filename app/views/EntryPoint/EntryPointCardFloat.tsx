import { Literal } from '@ontologies/core';
import * as schema from '@ontologies/schema';
import {
  FC,
  register,
  useProperty,
  useStrings,
} from 'link-redux';
import React from 'react';

import ButtonWithFeedback, { ButtonWithFeedbackProps } from '../../components/ButtonWithFeedback';
import { isFontAwesomeIRI, normalizeFontAwesomeIRI } from '../../helpers/iris';
import { cardFloatTopology } from '../../topologies/Card/CardFloat';
import { containerFloatTopology } from '../../topologies/Container/ContainerFloat';

interface EntryPointCardFloatProps extends ButtonWithFeedbackProps {
  count: Literal;
}

const EntryPointCardFloat: FC<EntryPointCardFloatProps> = ({
  active,
  count,
  disabled,
  onClick,
  subject,
  title,
  variant,
}): JSX.Element => {
  const [image] = useProperty(schema.image);
  const [name] = useProperty(schema.name);
  const [httpMethod] = useStrings(schema.httpMethod);
  const parsedURL = new URL(subject.value);
  const href = parsedURL && parsedURL.pathname + parsedURL.search;
  const icon = image && isFontAwesomeIRI(image.value) ? normalizeFontAwesomeIRI(image.value) : 'plus';

  return (
    <ButtonWithFeedback
      cardFloat
      plain
      active={active}
      disabled={disabled}
      href={httpMethod === 'GET' ? href : undefined}
      icon={icon}
      title={title ?? name.value}
      variant={variant}
      onClick={onClick}
    >
      {count.value}
    </ButtonWithFeedback>
  );
};

EntryPointCardFloat.type = schema.EntryPoint;

EntryPointCardFloat.topology = [
  cardFloatTopology,
  containerFloatTopology,
];

export default register(EntryPointCardFloat);
