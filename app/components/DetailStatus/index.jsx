import React, { PropTypes } from 'react';

import Detail from '../Detail';

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
  closed: {
    className: 'DetailStatus',
    icon: 'lock',
    text: 'Closed',
    title: 'De discussie is gesloten.',
  },
  fail: {
    className: 'DetailStatus--fail',
    icon: 'close',
    text: 'Verworpen',
    title: 'Het voorstel is verworpen.',
  },
  open: {
    className: 'DetailStatus',
    icon: 'comment-o',
    text: 'Open',
    title: 'De discussie is open.',
  },
  pass: {
    className: 'DetailStatus--pass',
    icon: 'check',
    text: 'Aangenomen',
    title: 'Het voorstel is geaccepteerd.',
  },
  planned: {
    className: 'DetailStatus',
    icon: 'calendar',
    text: 'Geagendeerd',
    title: 'Het voorstel zal worden besproken tijdens een vergadering in de toekomst.',
  },
  retracted: {
    className: 'DetailStatus',
    icon: 'close',
    text: 'Ingetrokken',
    title: 'Het voorstel is ingetrokken.',
  },
};

const DetailStatus = ({
  status,
}) => {
  const getValue = key => statusInfo[status][key];

  return (
    <Detail
      className={getValue('className')}
      icon={getValue('icon')}
      text={`Status: ${getValue('text')}`}
      title={getValue('title')}
    />
  );
};

DetailStatus.propTypes = propTypes;

export default DetailStatus;
