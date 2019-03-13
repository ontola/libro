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
import ErrorButtonWithFeedback from '../../Error/ErrorButtonWithFeedback';

class ArguLocation extends React.Component {
  static type = NS.schema('Thing');

  static property = NS.schema('location');

  static topology = containerTopology;

  static mapDataToProps = {
    childrenPlacements: NS.argu('childrenPlacements'),
    dataSubjects: NS.argu('childrenPlacements'),
    schemaLocation: NS.schema('location'),
  };

  static hocs = [withRouter];

  static propTypes = {
    childrenPlacements: linkType,
    history: PropTypes.shape({
      push: PropTypes.func,
    }),
    lrs: lrsType,
    schemaLocation: linkType,
    subject: subjectType,
  };

  constructor(props) {
    super(props);
    this.state = { error: undefined };
  }

  componentDidCatch(error) {
    this.props.lrs.report(error);
    this.setState({
      error,
    });
  }

  resolvePlacements() {
    const { childrenPlacements, lrs } = this.props;

    if (!childrenPlacements) {
      return [];
    }

    const children = listToArr(lrs, [], childrenPlacements);

    if (!Array.isArray(children)) {
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

    if (this.state.error) {
      return (
        <ErrorButtonWithFeedback
          reset={() => this.setState({ error: undefined })}
          {...this.props}
        />
      );
    }

    const placements = this.resolvePlacements();

    if (!schemaLocation && placements.length === 0) {
      return null;
    }

    return (
      <MapView
        renderSubject
        lrs={lrs}
        navigate={resource => history.push(retrievePath(resource.value))}
        placements={placements}
        subject={subject}
        subjectPlacement={placements ? undefined : subject}
      />
    );
  }
}

export default register(ArguLocation);
