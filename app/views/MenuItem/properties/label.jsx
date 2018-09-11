import { linkType, register } from 'link-redux';
import React from 'react';

import { Image } from '../../../components';
import { NS } from '../../../helpers/LinkedRenderStore';
import { cardFloatTopology } from '../../../topologies/Card/CardFloat';

class MenuItemLabel extends React.PureComponent {
  static type = [
    NS.argu('MenuItem'),
    NS.argu('SubMenu'),
    NS.argu('Menu'),
  ];

  static property = NS.schema('name');

  static topology = cardFloatTopology;

  static mapDataToProps = [NS.schema('name'), NS.schema('image')];

  static propTypes = {
    image: linkType,
    label: linkType,
  };

  render() {
    const { image, label } = this.props;

    return <Image ariaLabel={label.value} linkedProp={image} />;
  }
}

export default register(MenuItemLabel);
