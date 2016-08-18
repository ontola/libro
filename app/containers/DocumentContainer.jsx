// @flow
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { DocumentShow } from 'components';
import { apiGetDocument } from 'state/search/actions';

const propTypes = {
  data: PropTypes.object,
  loadDocument: PropTypes.func,
  loading: PropTypes.bool,
  params: PropTypes.object,
};

class DocumentContainer extends Component {
  componentWillMount() {
    this.props.loadDocument(this.props.params.docId);
  }

  render() {
    return <DocumentShow data={this.props.data} />;
  }
}

DocumentContainer.propTypes = propTypes;

export default connect(
  (state) => ({
    data: state.getIn(['search', 'document']),
    loading: state.getIn(['search', 'loading']),
  }),
  (dispatch) => ({
    loadDocument: (id) => dispatch(apiGetDocument(id)),
  })
)(DocumentContainer);
