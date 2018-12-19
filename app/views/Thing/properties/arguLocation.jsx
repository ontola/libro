import {
  linkType,
  lrsType,
  register,
  subjectType,
} from 'link-redux';
import PropTypes from 'prop-types';
import React from 'react';
import { withRouter } from 'react-router';

import MapView from '../../../containers/MapView';
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
    const {
      history,
      schemaLocation,
      lrs,
      subject,
    } = this.props;

    const placements = this.resolvePlacements();

    if (placements === 0) {
      return null;
    }

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
