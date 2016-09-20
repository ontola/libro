import './DetailStatus.scss';
import React, { PropTypes } from 'react';
import { Detail } from 'components';
import { statuses } from 'components/shared/config';

const propTypes = {
  status: PropTypes.oneOf(statuses).isRequired,
};

const DetailStatus = ({ status }) => {
  let className = 'DetailStatus';
  let icon = 'no-icon';
  let text = 'Onbekende status';
  let title = 'Dit is de fase waarin het idee zich bevindt.';

  switch (status) {
    case 'pass':
      className = 'DetailStatus--pass';
      icon = 'check';
      text = 'Aangenomen';
      title = 'Het voorstel is geaccepteerd.';
      break;
    case 'fail':
      className = 'DetailStatus--fail';
      icon = 'close';
      text = 'Verworpen';
      title = 'Het voorstel is verworpen.';
      break;
    case 'retracted':
      className = 'DetailStatus';
      icon = 'close';
      text = 'Ingetrokken';
      title = 'Het voorstel is ingetrokken.';
      break;
    case 'planned':
      className = 'DetailStatus';
      icon = 'calendar';
      text = 'Geagendeerd';
      title = 'Het voorstel zal worden besproken tijdens een vergadering in de toekomst.';
      break;
    case 'open':
      className = 'DetailStatus';
      icon = 'comment-o';
      text = 'Open';
      title = 'De discussie is open.';
      break;
    case 'closed':
      className = 'DetailStatus';
      icon = 'lock';
      text = 'Closed';
      title = 'De discussie is gesloten.';
      break;
    default:
      className = 'DetailStatus';
      break;
  }

  return (
    <Detail
      className={className}
      text={`Status: ${text}`}
      icon={icon}
      title={title}
    />
  );
};

DetailStatus.propTypes = propTypes;

export default DetailStatus;
