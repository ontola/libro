import { SomeTerm } from '@ontologies/core';
import * as schema from '@ontologies/schema';
import {
  FC,
  register,
  useIds,
  useStrings,
} from 'link-redux';
import React from 'react';

import Button from '../../../Common/components/Button';
import ButtonWithFeedback, { ButtonWithFeedbackProps } from '../../../Common/components/ButtonWithFeedback';
import { isFontAwesomeIRI, normalizeFontAwesomeIRI } from '../../../Common/lib/iris';
import { cardFloatTopology, containerFloatTopology } from '../../../Common/topologies';

interface EntryPointCardFloatProps extends Partial<ButtonWithFeedbackProps> {
  count: number;
  image: SomeTerm;
  name: string;
}

const EntryPointCardFloat: FC<EntryPointCardFloatProps> = ({
  active,
  count,
  disabled,
  image: imageFromProp,
  name: nameFromProp,
  onClick,
  subject,
  title,
  variant,
}): JSX.Element => {
  const [imageFromData] = useIds(schema.image);
  const [nameFromData] = useStrings(schema.name);
  const image = imageFromProp ?? imageFromData;
  const name = nameFromProp ?? nameFromData;
  const [httpMethod] = useStrings(schema.httpMethod);
  const parsedURL = new URL(subject.value);
  const href = parsedURL && parsedURL.pathname + parsedURL.search;
  const icon = image && isFontAwesomeIRI(image.value) ? normalizeFontAwesomeIRI(image.value) : 'plus';
  const props = {
    active,
    cardFloat: true,
    disabled,
    href: httpMethod === 'GET' ? href : undefined,
    icon,
    plain: true,
    title: title ?? name,
    variant,
  };

  if (onClick) {
    return (
      <ButtonWithFeedback
        {...props}
        onClick={onClick}
      >
        {count?.toString()}
      </ButtonWithFeedback>
    );
  }

  return (
    <Button {...props}>
      {count?.toString()}
    </Button>
  );
};

EntryPointCardFloat.type = schema.EntryPoint;

EntryPointCardFloat.topology = [
  cardFloatTopology,
  containerFloatTopology,
];

export default register(EntryPointCardFloat);
