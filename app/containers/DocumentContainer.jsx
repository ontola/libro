// @flow
import { connect } from 'react-redux';
import { DocumentShow } from '../components';
import { apiGetDocument } from '../actions/search';

const mapStateToProps = (state) => ({
  data: state.search.document,
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  actions: dispatch(apiGetDocument(ownProps.params.docId)),
});

const DocumentContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(DocumentShow);

export default DocumentContainer;
