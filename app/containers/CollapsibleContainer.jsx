import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import Collapsible from 'components/Collapsible';
import {
  initializeCollapsible,
  toggleOne,
} from 'state/collapsible/actions';
import { getCollapsible } from 'state/collapsible/selectors';

const propTypes = {
  id: PropTypes.any.isRequired,
  children: PropTypes.node.isRequired,
  group: PropTypes.string,
  startOpened: PropTypes.bool,
  trigger: PropTypes.node.isRequired,
  onInitializeCollapsible: PropTypes.func.isRequired,
  visibleContent: PropTypes.node,
};

const defaultProps = {
  startOpened: false,
};

function mapStateToProps(state, ownProps) {
  const { children, group, id, trigger, visibleContent } = ownProps;
  return {
    id,
    children,
    group,
    opened: getCollapsible(state, ownProps).opened,
    trigger,
    visibleContent,
  };
}

class CollapsibleContainer extends Component {
  componentWillMount() {
    this.props.onInitializeCollapsible({
      startOpened: this.props.startOpened,
      identifier: this.props.id,
      group: this.props.group,
    });
  }

  render() {
    return (
      <Collapsible
        {...this.props}
      />
    );
  }
}

CollapsibleContainer.propTypes = propTypes;
CollapsibleContainer.defaultProps = defaultProps;

export default connect(
  mapStateToProps,
  (dispatch, ownProps) => ({
    onClickToggle: () => {
      toggleOne(ownProps.id);
    },
    onInitializeCollapsible: (data) => {
      dispatch(initializeCollapsible(data));
    },
  })
)(CollapsibleContainer);
