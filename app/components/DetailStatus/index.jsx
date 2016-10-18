import './DetailStatus.scss';
import React, { PropTypes } from 'react';
import { Detail } from 'components';

const propTypes = {
  status: PropTypes.oneOf([
    'pass',
    'fail',
    'retracted',
    'planned',
    'open',
    'closed',
  ]).isRequired,
};

const statusInfo = {
  pass: {
    className: 'DetailStatus--pass',
    icon: 'check',
    text: 'Aangenomen',
    title: 'Het voorstel is geaccepteerd.',
  },
  fail: {
    className: 'DetailStatus--fail',
    icon: 'close',
    text: 'Verworpen',
    title: 'Het voorstel is verworpen.',
  },
  retracted: {
    className: 'DetailStatus',
    icon: 'close',
    text: 'Ingetrokken',
    title: 'Het voorstel is ingetrokken.',
  },
  planned: {
    className: 'DetailStatus',
    icon: 'calendar',
    text: 'Geagendeerd',
    title: 'Het voorstel zal worden besproken tijdens een vergadering in de toekomst.',
  },
  open: {
    className: 'DetailStatus',
    icon: 'comment-o',
    text: 'Open',
    title: 'De discussie is open.',
  },
  closed: {
    className: 'DetailStatus',
    icon: 'lock',
    text: 'Closed',
    title: 'De discussie is gesloten.',
  },
};

const DetailStatus = ({
  status,
}) => {
  const getValue = key => statusInfo[status][key];

  return (
    <Detail
      className={getValue('className')}
      text={`Status: ${getValue('text')}`}
      icon={getValue('icon')}
      title={getValue('title')}
    />
  );
};

DetailStatus.propTypes = propTypes;

export default DetailStatus;
