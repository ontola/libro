import { linkType, register } from 'link-redux';
import React from 'react';

import { NS } from '../../helpers/LinkedRenderStore';
import { actionsBarTopology } from '../../topologies/ActionsBar';
import { SignOutFormLink } from '../../components/SignOutForm';
import Button from '../../components/Button';

class AppSignOutActionsBar extends React.PureComponent {
  static type = NS.app('AppSignOut');

  static topology = actionsBarTopology;

  static mapDataToProps = [
    NS.schema('name'),
    NS.schema('url'),
  ];

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
      <SignOutFormLink Component={Button} redirectURL={url}>
        {name && name.value}
      </SignOutFormLink>
    );
  }
}

export default register(AppSignOutActionsBar);
