import { PropTypes } from 'react';
import { connect } from 'react-redux';

import Collapsible from 'components/Collapsible';
import { toggleOne } from 'state/collapsible/actions';
import { getCollapsible } from 'state/collapsible/selectors';

const propTypes = {
  id: PropTypes.any,
  children: PropTypes.node.isRequired,
  group: PropTypes.string,
  trigger: PropTypes.node.isRequired,
  visibleContent: PropTypes.node,
};

function identifier(ownProps) {
  return (ownProps.id || ownProps.trigger.key).toString();
}

function mapStateToProps(state, ownProps) {
  const { children, group, id, trigger, visibleContent } = ownProps;
  return {
    id,
    children,
    group,
    opened: getCollapsible(ownProps, identifier(ownProps)).opened,
    trigger,
    visibleContent,
  };
}

const CollapsibleContainer = connect(
  mapStateToProps,
  (dispatch, ownProps) => ({
    onClickToggle: () => {
      toggleOne(identifier(ownProps));
    },
  })
)(Collapsible);

CollapsibleContainer.propTypes = propTypes;

export default CollapsibleContainer;
