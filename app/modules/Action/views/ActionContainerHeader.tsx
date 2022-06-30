import * as schema from '@ontologies/schema';
import {
  FC,
  register,
  useProperty,
  useStrings,
} from 'link-redux';
import React from 'react';

import HeaderButton from '../../Common/components/Button/HeaderButton';
import { containerHeaderTopology } from '../../Common/topologies/Container/ContainerHeader';
import libro from '../../Core/ontology/libro';
import { isInvalidActionStatus } from '../hooks/useEnabledActions';
import useOneClickProps from '../hooks/useOneClickProps';

import { ActionProps } from './helpers';

const ActionContainerHeader: FC<ActionProps> = ({
  children,
  onDone,
}) => {
  const [actionStatus] = useProperty(schema.actionStatus);
  const [error] = useProperty(schema.error);
  const [name] = useProperty(schema.name);
  const [target] = useStrings(libro.target);

  const {
    icon,
    loading,
    onClick,
  } = useOneClickProps(onDone);

  if (children) {
    return (
      <React.Fragment>
        {children}
      </React.Fragment>
    );
  }

  if (!!error || isInvalidActionStatus(actionStatus)) {
    return null;
  }

  return (
    <HeaderButton
      icon={icon}
      loading={loading}
      target={target}
      title={name?.value}
      onClick={onClick}
    />
  );
};

ActionContainerHeader.type = schema.Action;

ActionContainerHeader.topology = containerHeaderTopology;

export default register(ActionContainerHeader);
