import schema from '@ontologies/schema';
import {
  Property,
  register,
  subjectType,
} from 'link-redux';
import React from 'react';

import CardContent from '../../components/Card/CardContent';
import HeaderWithMenu from '../../components/HeaderWithMenu';
import { NS } from '../../helpers/LinkedRenderStore';
import { CardMain } from '../../topologies/Card';
import ContentDetails from '../../topologies/ContentDetails';
import {
  PageHeaderImageAndTextWrapper,
  PageHeaderText,
  pageHeaderTopology,
} from '../../topologies/PageHeader';

class ThingPageHeader extends React.PureComponent {
  static type = schema.Thing;

  static topology = pageHeaderTopology;

  static propTypes = {
    subject: subjectType,
  };

  render() {
    return (
      <div about={this.props.subject?.value} className="ThingPageHeader">
        <CardMain>
          <CardContent>
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
                  <Property label={schema.name} />
                </HeaderWithMenu>
                <ContentDetails>
                  <Property label={NS.argu('grantedGroups')} />
                </ContentDetails>
                <Property label={schema.description} />
              </PageHeaderText>
            </PageHeaderImageAndTextWrapper>
          </CardContent>
        </CardMain>
      </div>
    );
  }
}

export default register(ThingPageHeader);
