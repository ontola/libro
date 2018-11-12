import { push } from 'connected-react-router';
import {
  linkType,
  Property,
  register, subjectType,
} from 'link-redux';
import * as PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';

import { currentURL, retrievePath } from '../../helpers/iris';
import { NS } from '../../helpers/LinkedRenderStore';
import Card from '../../topologies/Card';
import Container from '../../topologies/Container';
import { pageTopology } from '../../topologies/Page';
import PrimaryResource, { primaryResourceTopology } from '../../topologies/PrimaryResource';
import TabBar from '../../topologies/TabBar';
import TabPane from '../../topologies/TabPane';

const mapDispatchToProps = (dispatch, { lrs }) => ({
  goToFirstTab: (menuItems) => {
    if (!menuItems) return undefined;

    const firstItem = lrs.getResourceProperty(menuItems, NS.rdf('_0')).value;
    return dispatch(push(retrievePath(firstItem)));
  },
});

class MenuItemPage extends React.PureComponent {
  static type = [
    NS.argu('MenuItem'),
    NS.argu('MenuSection'),
    NS.argu('SubMenu'),
    NS.argu('Menu'),
  ];

  static topology = [
    pageTopology,
    primaryResourceTopology,
  ];

  static mapDataToProps = [NS.argu('menuItems'), NS.argu('parentMenu')];

  static propTypes = {
    goToFirstTab: PropTypes.func,
    menuItems: linkType,
    subject: subjectType,
    topLevel: PropTypes.bool,
  };

  static defaultProps = {
    topLevel: true,
  };

  static hocs = [connect(null, mapDispatchToProps)];

  componentDidMount() {
    this.checkProps();
  }

  componentDidUpdate() {
    this.checkProps();
  }

  checkProps() {
    const { menuItems, subject } = this.props;

    if (menuItems && currentURL() === subject.value) {
      this.props.goToFirstTab(menuItems);
    }
  }

  render() {
    const { topLevel } = this.props;

    return (
      <PrimaryResource>
        {topLevel && (
        <Container>
          <Card>
            <Property label={NS.schema('isPartOf')} />
          </Card>
        </Container>
        )}
        <Property label={NS.argu('parentMenu')} topLevel={false} />
        <TabBar>
          <Property label={NS.argu('menuItems')} />
        </TabBar>
        <TabPane>
          <Property label={NS.argu('href')} />
        </TabPane>
      </PrimaryResource>
    );
  }
}

export default register(MenuItemPage);
