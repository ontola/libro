import { linkType, register, subjectType } from 'link-redux';
import * as PropTypes from 'prop-types';
import React from 'react';
import { FormattedMessage } from 'react-intl';

import Heading from '../../components/Heading';
import LinkDuo from '../../components/LinkDuo';
import Resource from '../../components/Resource';
import { NS } from '../../helpers/LinkedRenderStore';
import { containerTopology } from '../../topologies/Container';

import getCollection from './getCollection';
import { CollectionTypes } from './types';

const ContainerCollection = getCollection({ omniform: true, renderWhenEmpty: false });

class CollectionContainer extends React.PureComponent {
  static type = CollectionTypes;

  static topology = containerTopology;

  static mapDataToProps = [NS.as('totalItems')];

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
      return <ContainerCollection {...this.props} />;
    }

    if (clickToOpen && totalItems.value !== '0' && !this.state.opened) {
      const open = (e) => {
        if (e) {
          e.preventDefault();
        }
        this.setState({ opened: true });
      };

      return (
        <Resource
          element={Heading}
          wrapperProps={{ className: `Collection__Depth-${depth}`, size: 5 }}
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
                count: totalItems,
              }}
            />
          </LinkDuo>
        </Resource>
      );
    }

    return (
      <ContainerCollection {...this.props} />
    );
  }
}

export default register(CollectionContainer);
