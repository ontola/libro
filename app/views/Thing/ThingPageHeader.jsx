import { Property, register, subjectType } from 'link-redux';
import React from 'react';

import { NS } from '../../helpers/LinkedRenderStore';
import { CardFloat } from '../../topologies/Card';
import {
  PageHeaderText,
  PageHeaderImageAndTextWrapper,
  PageHeaderMenuItems,
  pageHeaderTopology,
} from '../../topologies/PageHeader';

class ThingPageHeader extends React.PureComponent {
  static type = NS.schema('Thing');

  static topology = pageHeaderTopology;

  static propTypes = {
    subject: subjectType,
  };

  render() {
    return (
      <div about={this.props.subject?.value} className="ThingPageHeader">
        <PageHeaderMenuItems>
          <CardFloat>
            <Property label={NS.ontola('followMenu')} />
            <Property label={NS.ontola('shareMenu')} />
            <Property label={NS.ontola('actionsMenu')} />
          </CardFloat>
        </PageHeaderMenuItems>
        <PageHeaderImageAndTextWrapper>
          <PageHeaderText>
            <Property label={NS.schema('name')} />
            <Property label={NS.schema('description')} />
          </PageHeaderText>
        </PageHeaderImageAndTextWrapper>
      </div>
    );
  }
}

export default register(ThingPageHeader);
