import {
  linkType,
  lrsType,
  register,
  subjectType,
} from 'link-redux';
import PropTypes from 'prop-types';
import React from 'react';
import { withRouter } from 'react-router';

import { listToArr } from '../../../helpers/data';
import { retrievePath } from '../../../helpers/iris';
import { NS } from '../../../helpers/LinkedRenderStore';
import { containerTopology } from '../../../topologies/Container';

class ArguLocation extends React.Component {
  static type = NS.schema('Thing');

  static property = NS.schema('location');

  static topology = containerTopology;

  static mapDataToProps = {
    childrenPlacements: NS.argu('childrenPlacements'),
    schemaLocation: NS.schema('location'),
  };

  static hocs = [withRouter];

  static propTypes = {
    childrenPlacements: linkType,
    history: PropTypes.instanceOf(History),
    lrs: lrsType,
    schemaLocation: linkType,
    subject: subjectType,
  };

  constructor(props) {
    super(props);

    this.state = {
      MapView: undefined,
    };
  }

  componentDidMount() {
    if (this.resolvePlacements().length > 0 && !this.state.MapView) {
      return this.loadView();
    }

    return undefined;
  }

  componentDidUpdate() {
    if (this.resolvePlacements().length > 0 && !this.state.MapView) {
      return this.loadView();
    }

    return undefined;
  }

  async loadView() {
    // eslint-disable-next-line no-inline-comments
    const MapView = await import(/* webpackChunkName: 'MapView' */ '../../../async/MapView/index');

    this.setState({
      MapView: MapView.default,
    });
  }

  resolvePlacements() {
    const { childrenPlacements, schemaLocation, lrs } = this.props;

    if (!childrenPlacements) {
      return [schemaLocation];
    }

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
      history,
      schemaLocation,
      lrs,
      subject,
    } = this.props;

    const placements = this.resolvePlacements();

    return (
      <MapView
        location={schemaLocation}
        lrs={lrs}
        navigate={resource => history.push(retrievePath(resource.value))}
        placements={placements}
        subject={subject}
      />
    );
  }
}

export default register(ArguLocation);
