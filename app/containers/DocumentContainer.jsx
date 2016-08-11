// @flow
import { connect } from 'react-redux';
import { DocumentShow } from 'components';
import { apiGetDocument } from 'state/search/actions';

const mapStateToProps = (state) => ({
  data: state.search.document,
  loading: state.search.loading,
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  actions: dispatch(apiGetDocument(ownProps.params.docId)),
});

const DocumentContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(DocumentShow);

export default DocumentContainer;
