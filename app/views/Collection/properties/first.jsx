import LinkedRenderStore from 'link-lib';
import { PropertyBase, withLinkCtx } from 'link-redux';
import React from 'react';
import { injectIntl } from 'react-intl';
import { connect } from 'react-redux';

import { messages } from '../../CollectionPage/properties/first';
import { Button } from '../../../components';
import { NS } from '../../../helpers/LinkedRenderStore';
import { gotoPage } from '../../../state/pagination/actions';
import { getPage } from '../../../state/pagination/selectors';
import { allTopologies } from '../../../topologies';
import { CollectionTypes } from '../types';

/**
 * Renders a pagination element if the `argu:first` property is available.
 */
class First extends PropertyBase {
  allPages() {
    const { intl: formatMessage } = this.props;
    const pageProp = 'page';
    const baseUrl = new URL(this.props.linkedProp.value);
    const firstPage = Number.parseInt(baseUrl.searchParams.get(pageProp), 10);
    const lastPage = Number.parseInt(new URL(this.getLinkedObjectProperty(NS.as('last')).value).searchParams.get(pageProp), 10);
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
      const action = gotoPage(this.props.collectionIRI, baseUrl.toString());
      const isCurrent = this.props.currentPage === baseUrl.toString();
      pages.push((
        <Button
          small
          disabled={isCurrent}
          key={`${this.props.collectionIRI}-page-switcher-${i}`}
          theme="pagination"
          onClick={() => this.props.dispatch(action)}
        >
          {i}
        </Button>
      ));
    }
    if (currentPageNr !== lastPage) {
      const action = gotoPage(this.props.collectionIRI, nextPage());
      pages.push((
        <Button
          small
          icon="arrow-right"
          key={`${this.props.collectionIRI}-page-switcher-next`}
          theme="pagination"
          title={formatMessage(messages.next)}
          onClick={() => this.props.dispatch(action)}
        />
      ));
    }
    if (currentPageNr !== firstPage) {
      const action = gotoPage(this.props.collectionIRI, previousPage());
      pages.unshift((
        <Button
          small
          icon="arrow-left"
          key={`${this.props.collectionIRI}-page-switcher-previous`}
          theme="pagination"
          title={formatMessage({
            id: 'https://app.argu.co/i18n/as:CollectionPage/as:previous/label',
          })}
          onClick={() => this.props.dispatch(action)}
        />
      ));
    }
    return pages;
  }

  shouldComponentUpdate(nextProps) {
    return this.props.currentPage !== nextProps.currentPage;
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


const ConnectedFirst = connect((state, { collectionIRI, linkedProp }) => ({
  currentPage: getPage(state, collectionIRI) || linkedProp.value,
}))(First);

export default LinkedRenderStore.registerRenderer(
  withLinkCtx(injectIntl(ConnectedFirst)),
  CollectionTypes,
  NS.as('first'),
  allTopologies
);
