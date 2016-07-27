// @flow
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { List, MotionsListItem } from '../components';
import Motion from '../models/Motion';

const propTypes = {
  motions: PropTypes.array,
  loadMotions: PropTypes.func.isRequired,
};

const defaultProps = {
  motions: [],
};

class MotionsContainer extends Component {
  componentDidMount() {
    this.props.loadMotions();
  }

  renderItem(data) {
    return (
      <MotionsListItem
        key={data.id}
        motion={data}
      />
    );
  }

  render() {
    const { motions } = this.props;
    return <List renderItem={this.renderItem} items={motions} />;
  }
}

MotionsContainer.defaultProps = defaultProps;
MotionsContainer.propTypes = propTypes;

const mapStateToProps = (state) => ({
  motions: state.getIn(['motions', 'items']).toArray(),
});

const mapDispatchToProps = (dispatch) => ({
  loadMotions: () => {
    dispatch(Motion.index());
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MotionsContainer);
