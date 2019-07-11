import {
  linkType,
  register,
  subjectType,
} from 'link-redux';
import PropTypes from 'prop-types';
import React from 'react';
import { defineMessages, injectIntl, intlShape } from 'react-intl';

import { Button } from '../../../components';
import { NS } from '../../../helpers/LinkedRenderStore';
import { allTopologiesExcept } from '../../../topologies';
import { CollectionTypes } from '../types';
import { cardAppendixTopology } from '../../../topologies/Card/CardAppendix';
import CardRow from '../../../topologies/Card/CardRow';
import CardContent from '../../../components/Card/CardContent';

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

const getPagination = (Wrapper, topology) => {
  const DefaultPagination = (props) => {
    const {
      currentPage,
      first,
      intl: { formatMessage },
      last,
      onPageChange,
      subject,
    } = props;
    if (!first) {
      return null;
    }

    const pageProp = 'page';
    const baseUrl = new URL(first.value);
    const firstPage = Number.parseInt(baseUrl.searchParams.get(pageProp), 10);
    const lastPage = Number.parseInt(new URL(last.value).searchParams.get(pageProp), 10);
    const currentOrFirst = currentPage || first.value;
    const currentPageUrl = new URL(currentOrFirst);
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

    const paginationButton = ({
      active,
      alt,
      disabled = false,
      icon,
      key,
      label,
      url,
    } = {}) => {
      const className = active ? 'Button--active' : null;

      return (
        <Button
          small
          alt={alt}
          className={className}
          disabled={disabled}
          icon={icon}
          key={`${key}-${subject.value}-page-switcher-${key}`}
          theme="pagination"
          onClick={() => onPageChange(url)}
        >
          {label}
        </Button>
      );
    };

    const singlePageButton = (page) => {
      baseUrl.searchParams.set(pageProp, page);
      const isCurrent = currentOrFirst === baseUrl.toString();

      return paginationButton({
        active: isCurrent,
        disabled: isCurrent,
        key: page,
        label: page,
        url: baseUrl.toString(),
      });
    };

    const pages = [];
    pages.push(paginationButton({
      alt: formatMessage(messages.nextLabel),
      disabled: currentPageNr === firstPage,
      icon: 'arrow-left',
      key: 'prev',
      url: previousPage(),
    }));

    const span = 3;
    const spanFrom = Math.max(firstPage + 1, currentPageNr - span);
    const spanTo = Math.min(currentPageNr + span, lastPage - 1);

    pages.push(singlePageButton(firstPage));
    if (spanFrom > firstPage + 1) {
      pages.push(<span>...</span>);
    }

    for (let i = spanFrom; i <= spanTo; i++) {
      pages.push(singlePageButton(i));
    }

    if (spanTo < lastPage - 1) {
      pages.push(<span>...</span>);
    }
    pages.push(singlePageButton(lastPage));

    pages.push(paginationButton({
      alt: formatMessage(messages.nextLabel),
      disabled: currentPageNr === lastPage,
      icon: 'arrow-right',
      key: 'next',
      url: nextPage(),
    }));

    return (
      <Wrapper>
        <div className="pagination-wrapper">
          {pages}
        </div>
      </Wrapper>
    );
  };

  DefaultPagination.type = [...CollectionTypes, NS.argu('SearchResult')];

  DefaultPagination.property = NS.ontola('defaultPagination');

  DefaultPagination.topology = topology;

  DefaultPagination.mapDataToProps = {
    collectionType: NS.ontola('collectionType'),
    first: NS.as('first'),
    last: NS.as('last'),
  };

  DefaultPagination.hocs = [injectIntl];

  DefaultPagination.propTypes = {
    currentPage: PropTypes.string,
    first: linkType,
    intl: intlShape,
    last: linkType,
    onPageChange: PropTypes.func,
    subject: subjectType,
  };

  return DefaultPagination;
};

export const CardAppendixContent = ({ children }) => (
  <CardRow backdrop>
    <CardContent>
      {children}
    </CardContent>
  </CardRow>
);
CardAppendixContent.propTypes = { children: PropTypes.node };

export default [
  register(getPagination(React.Fragment, allTopologiesExcept(cardAppendixTopology))),
  register(getPagination(CardAppendixContent, cardAppendixTopology)),
];