import LinkedRenderStore from 'link-lib';
import { link } from 'link-redux';
import PropTypes from 'prop-types';
import React from 'react';
import { defineMessages, injectIntl, intlShape } from 'react-intl';
import { connect } from 'react-redux';

import { Button } from '../../../components';
import { NS } from '../../../helpers/LinkedRenderStore';
import { gotoPage } from '../../../state/pagination/actions';
import { getPage } from '../../../state/pagination/selectors';
import { allTopologies } from '../../../topologies';
import { CollectionViewTypes } from '../types';

const propTypes = {
  currentPage: PropTypes.string,
  dispatch: PropTypes.func,
  first: PropTypes.string,
  intl: intlShape,
  last: PropTypes.string,
  partOf: PropTypes.string,
};

export const messages = defineMessages({
  nextLabel: {
    defaultMessage: 'next',
    id: 'https://app.argu.co/i18n/as:CollectionPage/as:next/label',
  },
  previousLabel: {
    defaultMessage: 'previous',
    id: 'https://app.argu.co/i18n/as:CollectionPage/as:previous/label',
  },
});

/**
 * Renders a pagination element if the `argu:first` property is available.
 */
class CollectionPageFirst extends React.PureComponent {
  allPages() {
    const {
      first,
      intl: { formatMessage },
      last,
      partOf,
    } = this.props;

    const pageProp = 'page';
    const baseUrl = new URL(first);
    const firstPage = Number.parseInt(baseUrl.searchParams.get(pageProp), 10);
    const lastPage = Number.parseInt(new URL(last).searchParams.get(pageProp), 10);
    const currentPageUrl = new URL(this.props.currentPage);
    const currentPageNr = Number.parseInt(currentPageUrl.searchParams.get(pageProp), 10);
    const nextPage = () => {
      currentPageUrl.searchParams.set(pageProp, currentPageNr + 1);
      return currentPageUrl.href;
    };
    const previousPage = () => {
      currentPageUrl.searchParams.set(pageProp, currentPageNr - 1);
      return currentPageUrl.href;
    };
    if (firstPage > lastPage || typeof lastPage === 'undefined') {
      throw new Error('First page is higher than last page or last is undefined');
    }

    // Don't show the pagination buttons if there's just one page
    if (firstPage === lastPage) {
      return null;
    }

    const pages = [];
    for (let i = firstPage; i <= lastPage; i++) {
      baseUrl.searchParams.set(pageProp, i);
      const action = gotoPage(partOf, baseUrl.toString());
      const isCurrent = this.props.currentPage === baseUrl.toString();
      pages.push((
        <Button
          small
          disabled={isCurrent}
          key={`${partOf}-page-switcher-${i}`}
          theme="pagination"
          onClick={() => this.props.dispatch(action)}
        >
          {i}
        </Button>
      ));
    }
    if (currentPageNr !== lastPage) {
      const action = gotoPage(partOf, nextPage());
      pages.push((
        <Button
          small
          alt={formatMessage(messages.nextLabel)}
          icon="arrow-right"
          key={`${partOf}-page-switcher-next`}
          theme="pagination"
          onClick={() => this.props.dispatch(action)}
        />
      ));
    }
    if (currentPageNr !== firstPage) {
      const action = gotoPage(partOf, previousPage());
      pages.unshift((
        <Button
          small
          alt={formatMessage(messages.previousLabel)}
          icon="arrow-left"
          key={`${partOf}-page-switcher-previous`}
          theme="pagination"
          onClick={() => this.props.dispatch(action)}
        />
      ));
    }
    return pages;
  }

  render() {
    const pages = this.allPages();
    return (
      <div style={{ marginBottom: '1em' }}>
        {pages}
      </div>
    );
  }
}

CollectionPageFirst.propTypes = propTypes;

const ConnectedFirst = connect((state, { partOf, first }) => ({
  currentPage: getPage(state, partOf) || first,
}))(CollectionPageFirst);

export default LinkedRenderStore.registerRenderer(
  link([
    NS.as('first'),
    NS.as('last'),
    NS.as('partOf'),
  ], { returnType: 'value' })(injectIntl(ConnectedFirst)),
  CollectionViewTypes,
  NS.as('first'),
  allTopologies
);
