import * as schema from '@ontologies/schema';
import { SomeTerm } from '@ontologies/core';
import {
  FC,
  register,
} from 'link-redux';
import React, { MouseEventHandler } from 'react';

import Button from '../../components/Button';
import { isFontAwesomeIRI, normalizeFontAwesomeIRI } from '../../helpers/iris';
import { cardFloatTopology } from '../../topologies/Card/CardFloat';
import { containerFloatTopology } from '../../topologies/Container/ContainerFloat';

interface EntryPointButtonProps {
  image: SomeTerm;
  name: SomeTerm;
  onClick: MouseEventHandler;
}

const EntryPointButton: FC<EntryPointButtonProps> = ({
  image,
  name,
  onClick,
  subject,
}): JSX.Element => {
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

EntryPointButton.mapDataToProps = {
  image: schema.image,
  name: schema.name,
};

export default register(EntryPointButton);
