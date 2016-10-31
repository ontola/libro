/* eslint react/no-multi-comp: 0 */
/* eslint react/prefer-stateless-function: 0 */
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
// import LinkedRenderStore from 'link-lib';
import { fetchLinkedObject, LinkedObjectContainer } from 'link-redux';

import {
  getCurrentRelation,
  getCurrentRelationId,
} from 'state/relationsBrowser/selectors';

const propTypes = {
  data: PropTypes.object,
  loadRelation: PropTypes.func.isRequired,
  object: PropTypes.any,
};

class RelationsBrowserContainer extends Component {
  componentWillMount() {
    this.loadRelation(this.props);
  }

  componentWillReceiveProps(nextProps) {
    const { data } = nextProps;
    if (typeof data === 'undefined' || typeof data.href_url !== 'string') {
      this.loadRelation(nextProps);
    }
  }

  loadRelation(props = this.props) {
    if (props.data === undefined && props.object !== undefined) {
      return this.props.loadRelation(props.object);
    }
    return undefined;
  }

  render() {
    const {
      data,
      object,
    } = this.props;

    if (!data || !object) {
      return null;
    }
    return (
      <div>
        <LinkedObjectContainer object={object} />
      </div>
    );
  }
}

RelationsBrowserContainer.propTypes = propTypes;

const ConnectedRelationsContainer = connect(
  (state, ownProps) => ({
    object: getCurrentRelationId(state, ownProps.schemaObject['@id']),
    data: getCurrentRelation(state, ownProps.schemaObject['@id']),
  }),
  dispatch => ({
    loadRelation: href => dispatch(fetchLinkedObject(href)),
  })
)(RelationsBrowserContainer);

class RelationsBrowserWrapper extends Component {
  render() {
    return (
      <ConnectedRelationsContainer
        schemaObject={this.context.schemaObject}
        {...this.props}
      />
    );
  }
}

RelationsBrowserWrapper.contextTypes = {
  schemaObject: PropTypes.object,
};

export default RelationsBrowserWrapper;
