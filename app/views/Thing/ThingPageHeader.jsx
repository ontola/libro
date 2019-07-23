import {
  Property,
  register,
  subjectType,
} from 'link-redux';
import React from 'react';

import { NS } from '../../helpers/LinkedRenderStore';
import ContentDetails from '../../topologies/ContentDetails';
import {
  PageHeaderImageAndTextWrapper,
  PageHeaderText,
  pageHeaderTopology,
} from '../../topologies/PageHeader';
import HeaderWithMenu from '../../components/HeaderWithMenu';

class ThingPageHeader extends React.PureComponent {
  static type = NS.schema('Thing');

  static topology = pageHeaderTopology;

  static propTypes = {
    subject: subjectType,
  };

  render() {
    return (
      <div about={this.props.subject?.value} className="ThingPageHeader">
        <PageHeaderImageAndTextWrapper>
          <PageHeaderText>
            <HeaderWithMenu
              menu={(
                <React.Fragment>
                  <Property label={NS.ontola('followMenu')} />
                  <Property label={NS.ontola('shareMenu')} />
                  <Property label={NS.ontola('actionsMenu')} />
                </React.Fragment>
              )}
            >
              <Property label={NS.schema('name')} />
            </HeaderWithMenu>
            <ContentDetails>
              <Property label={NS.argu('grantedGroups')} />
            </ContentDetails>
            <Property label={NS.schema('description')} />
          </PageHeaderText>
        </PageHeaderImageAndTextWrapper>
      </div>
    );
  }
}

export default register(ThingPageHeader);
