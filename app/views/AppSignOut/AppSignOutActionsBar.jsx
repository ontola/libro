import * as schema from '@ontologies/schema';
import { linkType, register } from 'link-redux';
import React from 'react';

import app from '../../ontology/app';
import { actionsBarTopology } from '../../topologies/ActionsBar';
import { SignOutFormLink } from '../../components/SignOutForm';
import Button from '../../components/Button';

class AppSignOutActionsBar extends React.PureComponent {
  static type = app.AppSignOut;

  static topology = actionsBarTopology;

  static mapDataToProps = {
    name: schema.name,
    url: schema.url,
  };

  static propTypes = {
    name: linkType,
    url: linkType,
  };

  render() {
    const {
      name,
      url,
    } = this.props;

    return (
      <SignOutFormLink
        Component={Button}
        redirectURL={url}
      >
        {name && name.value}
      </SignOutFormLink>
    );
  }
}

export default register(AppSignOutActionsBar);
