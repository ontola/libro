import * as schema from '@ontologies/schema';
import {
  register,
  useGlobalIds,
  useValues,
} from 'link-redux';
import React from 'react';

import { actionsBarTopology } from '../../../Action/topologies';
import app from '../../../Common/ontology/app';
import { SignOutFormLink } from '../../components/SignOutForm';

const AppSignOutActionsBar = (): JSX.Element => {
  const [url] = useGlobalIds(schema.url);
  const [name] = useValues(schema.name);

  return (
    <SignOutFormLink redirectURL={url}>
      {name}
    </SignOutFormLink>
  );
};

AppSignOutActionsBar.type = app.AppSignOut;

AppSignOutActionsBar.topology = actionsBarTopology;

export default register(AppSignOutActionsBar);
