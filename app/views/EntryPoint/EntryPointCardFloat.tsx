import * as schema from '@ontologies/schema';
import {
  FC,
  register,
  useProperty,
} from 'link-redux';
import React, { MouseEventHandler } from 'react';

import Button from '../../components/Button';
import { isFontAwesomeIRI, normalizeFontAwesomeIRI } from '../../helpers/iris';
import { cardFloatTopology } from '../../topologies/Card/CardFloat';
import { containerFloatTopology } from '../../topologies/Container/ContainerFloat';

interface EntryPointButtonProps {
  onClick: MouseEventHandler;
}

const EntryPointButton: FC<EntryPointButtonProps> = ({
  onClick,
  subject,
}): JSX.Element => {
  const [image] = useProperty(schema.image);
  const [name] = useProperty(schema.name);
  const parsedURL = new URL(subject.value);
  const href = parsedURL && parsedURL.pathname + parsedURL.search;
  const icon = image && isFontAwesomeIRI(image.value) ? normalizeFontAwesomeIRI(image.value) : 'plus';

  return (
    <Button
      plain
      className="Button--CardFloat"
      href={href}
      icon={icon}
      title={name.value}
      onClick={onClick}
    />
  );
};

EntryPointButton.type = schema.EntryPoint;

EntryPointButton.topology = [
  cardFloatTopology,
  containerFloatTopology,
];

export default register(EntryPointButton);
