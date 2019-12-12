import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';

import Collapsible from '../components/Collapsible';
import { initializeCollapsible, toggleOne } from '../state/collapsible/actions';
import { getCollapsibleOpened } from '../state/collapsible/selectors';

const propTypes = {
  group: PropTypes.string,
  id: PropTypes.string.isRequired,
  onInitializeCollapsible: PropTypes.func.isRequired,
  opened: PropTypes.bool,
  startOpened: PropTypes.bool,
};

const defaultProps = {
  startOpened: false,
};

class CollapsibleContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      hideChildren: false,
    };
    this.hideChildren = this.hideChildren.bind(this);
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    return {
      hideChildren: !nextProps.opened && prevState ? prevState.hideChildren : false,
    };
  }

  componentDidMount() {
    if (this.props.id === undefined) {
      throw new Error();
    }

    this.props.onInitializeCollapsible({
      group: this.props.group,
      identifier: this.props.id,
      startOpened: this.props.startOpened,
    });
  }

  hideChildren() {
    this.setState({
      hideChildren: true,
    });
  }

  render() {
    return (
      <Collapsible
        {...this.props}
        hideChildren={this.state.hideChildren}
        notOpened={this.hideChildren}
      />
    );
  }
}

CollapsibleContainer.propTypes = propTypes;
CollapsibleContainer.defaultProps = defaultProps;

export default connect(
  (state, ownProps) => ({
    opened: getCollapsibleOpened(state, ownProps.id),
  }),
  (dispatch, { id }) => ({
    onClickToggle: () => dispatch(toggleOne(id)),
    onInitializeCollapsible: data => dispatch(initializeCollapsible(data)),
  })
)(CollapsibleContainer);
