import { linkType, subjectType } from 'link-redux';
import PropTypes from 'prop-types';
import React from 'react';
import { FormattedMessage } from 'react-intl';

import Heading from '../Heading';
import LinkDuo from '../LinkDuo';
import ResourceBoundary from '../ResourceBoundary';

const CollectionPreview = ({
  depth,
  setOpen,
  subject,
  totalItems,
}) => {
  const open = (e) => {
    if (e) {
      e.preventDefault();
    }
    setOpen(true);
  };

  return (
    <ResourceBoundary
      element={Heading}
      wrapperProps={{
        className: `Collection__Depth-${depth}`,
        size: 5,
      }}
    >
      <LinkDuo
        className={`Collection__Depth-${depth + 1}`}
        to={subject.value}
        onClick={open}
        onKeyUp={open}
      >
        <FormattedMessage
          defaultMessage="Show {count} additional replies..."
          id="https://app.argu.co/i18n/collections/showRepliesLabel"
          values={{
            count: totalItems.value,
          }}
        />
      </LinkDuo>
    </ResourceBoundary>
  );
};

CollectionPreview.propTypes = {
  depth: PropTypes.number,
  setOpen: PropTypes.func,
  subject: subjectType,
  totalItems: linkType,
};

export default CollectionPreview;
