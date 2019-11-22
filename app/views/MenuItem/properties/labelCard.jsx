import { linkType, register } from 'link-redux';
import React from 'react';

import { Image } from '../../../components';
import { NS } from '../../../helpers/LinkedRenderStore';
import { cardFloatTopology } from '../../../topologies/Card/CardFloat';
import { containerFloatTopology } from '../../../topologies/Container/ContainerFloat';

class MenuItemLabelCard extends React.PureComponent {
  static type = [
    NS.ontola('MenuItem'),
    NS.argu('SubMenu'),
    NS.argu('Menu'),
  ];

  static property = NS.schema('name');

  static topology = [cardFloatTopology, containerFloatTopology];

  static mapDataToProps = {
    image: NS.schema('image'),
    name: NS.schema('name'),
  };

  static propTypes = {
    image: linkType,
    label: linkType,
  };

  render() {
    const { image, label } = this.props;

    return <Image ariaLabel={label.value} linkedProp={image} />;
  }
}

export default register(MenuItemLabelCard);
