import { linkedPropType, register, LinkedResourceContainer } from 'link-redux';
import React from 'react';

import { NS } from '../../../helpers/LinkedRenderStore';
import { BreadcrumbsBar } from '../../../components';

class IsPartOfPage extends React.PureComponent {
  static type = NS.schema('Thing');

  static topology = NS.argu('container');

  static property = NS.schema('isPartOf');

  static propTypes = {
    linkedProp: linkedPropType,
  };

  render() {
    const { linkedProp } = this.props;

    return (
      <BreadcrumbsBar>
        <LinkedResourceContainer subject={linkedProp} />
      </BreadcrumbsBar>
    );
  }
}

export default register(IsPartOfPage);
