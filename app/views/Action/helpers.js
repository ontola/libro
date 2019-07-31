import { omniformOpenInline, omniformSetAction } from '../../state/omniform';

const mapCardListDispatchToProps = (dispatch, ownProps) => ({
  onClick: (e) => {
    e.preventDefault();

    return Promise.all([
      dispatch(omniformOpenInline(ownProps.isPartOf)),
      dispatch(omniformSetAction({
        action: ownProps.subject,
        parentIRI: btoa(ownProps.isPartOf),
      })),
    ]);
  },
});

export default mapCardListDispatchToProps;
