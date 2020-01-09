import {
  linkType,
  register,
  subjectType,
} from 'link-redux';
import * as PropTypes from 'prop-types';
import React from 'react';
import { FormattedMessage } from 'react-intl';

import Heading from '../../components/Heading';
import LinkDuo from '../../components/LinkDuo';
import ResourceBoundary from '../../components/ResourceBoundary';
import { containerTopology } from '../../topologies/Container';

import getCollection from './getCollection';

const CollectionBase = getCollection({
  omniform: true,
  renderWhenEmpty: false,
  topology: containerTopology,
});

class CollectionContainer extends CollectionBase {
  static propTypes = {
    clickToOpen: PropTypes.bool,
    depth: PropTypes.number,
    subject: subjectType,
    totalItems: linkType,
  };

  constructor(props) {
    super(props);

    this.state = {
      opened: false,
    };
  }

  render() {
    const {
      clickToOpen,
      depth,
      totalItems,
      subject,
    } = this.props;

    if (!depth || depth <= 1) {
      return this.renderCollection();
    }

    if (clickToOpen && totalItems.value !== '0' && !this.state.opened) {
      const open = (e) => {
        if (e) {
          e.preventDefault();
        }
        this.setState({ opened: true });
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
    }

    return this.renderCollection();
  }
}

export default register(CollectionContainer);
