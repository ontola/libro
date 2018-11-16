import { push } from 'connected-react-router';
import {
  linkType,
  lrsType,
  register,
  subjectType,
} from 'link-redux';
import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';

import { listToArr } from '../../../helpers/data';
import { retrievePath } from '../../../helpers/iris';
import { NS } from '../../../helpers/LinkedRenderStore';
import { containerTopology } from '../../../topologies/Container';

const mapDispatchToProps = dispatch => ({
  navigate: resource => dispatch(push(retrievePath(resource.value))),
});

class ArguLocation extends React.Component {
  static type = NS.schema('Thing');

  static property = NS.schema('location');

  static topology = containerTopology;

  static mapDataToProps = [
    NS.argu('childrenPlacements'),
    NS.schema('location'),
  ];

  static hocs = [connect(null, mapDispatchToProps)];

  static propTypes = {
    childrenPlacements: linkType,
    location: linkType,
    lrs: lrsType,
    navigate: PropTypes.func,
    subject: subjectType,
  };

  constructor(props) {
    super(props);

    this.state = {
      MapView: undefined,
    };
  }

  async componentDidMount() {
    // eslint-disable-next-line no-inline-comments
    const MapView = await import(/* webpackChunkName: 'MapView' */ '../../../async/MapView/index');

    this.setState({
      MapView: MapView.default,
    });
  }

  resolveChildren() {
    const { childrenPlacements, lrs } = this.props;

    const children = listToArr(lrs, [], childrenPlacements);

    if (!Array.isArray(children)) {
      children.then(() => {
        this.forceUpdate();
      });

      return [];
    }

    return children;
  }

  render() {
    const { MapView } = this.state;

    if (!MapView) {
      return null;
    }

    const {
      location,
      lrs,
      navigate,
      subject,
    } = this.props;

    const placements = this.resolveChildren();

    return (
      <MapView
        location={location}
        lrs={lrs}
        navigate={navigate}
        placements={placements}
        subject={subject}
      />
    );
  }
}

export default register(ArguLocation);
