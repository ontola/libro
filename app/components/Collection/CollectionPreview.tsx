import { SomeTerm } from '@ontologies/core';
import { SomeNode } from 'link-lib';
import React, { KeyboardEvent, MouseEvent } from 'react';
import { FormattedMessage } from 'react-intl';

import Heading from '../Heading';
import LinkDuo from '../LinkDuo';
import ResourceBoundary from '../ResourceBoundary';

interface CollectionPreviewProps {
  depth: number;
  setOpen: (open: boolean) => void;
  subject: SomeNode;
  totalItems: SomeTerm;
}

const CollectionPreview: React.FC<CollectionPreviewProps> = ({
  depth,
  setOpen,
  subject,
  totalItems,
}) => {
  const open = (e: KeyboardEvent<Element> | MouseEvent<Element>) => {
    if (e) {
      e.preventDefault();
    }
    setOpen(true);
  };

  const wrapperProps = React.useMemo(() => ({
    className: `Collection__Depth-${depth}`,
    size: 5,
  }), [depth]);

  return (
    <ResourceBoundary
      element={Heading}
      wrapperProps={wrapperProps}
    >
      <LinkDuo
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

export default CollectionPreview;
