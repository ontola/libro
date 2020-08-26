import as from '@ontologies/as';
import rdf from '@ontologies/core';
import rdfx from '@ontologies/rdf';
import {
  linkType,
  register,
  subjectType,
  useResourceProperty,
} from 'link-redux';
import PropTypes from 'prop-types';
import React from 'react';
import { defineMessages, useIntl } from 'react-intl';

import Button from '../../../components/Button';
import CardContent from '../../../components/Card/CardContent';
import ontola from '../../../ontology/ontola';
import { allTopologiesExcept } from '../../../topologies';
import { cardAppendixTopology } from '../../../topologies/Card/CardAppendix';
import CardRow from '../../../topologies/Card/CardRow';
import { pageTopology } from '../../../topologies/Page';
import { CollectionTypes } from '../types';

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
      collectionResource,
      first,
      last,
      setCurrentPage,
      subject,
    } = props;
    const { formatMessage } = useIntl();
    const [collectionResourceType] = useResourceProperty(collectionResource, rdfx.type);

    if (!first) {
      return null;
    }

    const pageProp = 'page';
    const baseUrl = new URL(first.value);
    const firstPage = Number.parseInt(baseUrl.searchParams.get(pageProp), 10);
    const lastPage = Number.parseInt(new URL(last.value).searchParams.get(pageProp), 10);
    const currentOrFirst = typeof collectionResource === 'undefined' || CollectionTypes.includes(collectionResourceType)
      ? first.value
      : collectionResource.value;
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
          onClick={(e) => {
            e.preventDefault();
            setCurrentPage(rdf.namedNode(url));
          }}
        >
          {label}
        </Button>
      );
    };

    paginationButton.propTypes = {
      active: PropTypes.bool,
      alt: PropTypes.string,
      disabled: PropTypes.bool,
      icon: PropTypes.string,
      key: PropTypes.string,
      label: PropTypes.string,
      url: PropTypes.string,
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
        <div className="pagination-wrapper" data-testid="paginationWrapper">
          {pages}
        </div>
      </Wrapper>
    );
  };

  DefaultPagination.type = CollectionTypes;

  DefaultPagination.property = ontola.defaultPagination;

  DefaultPagination.topology = topology;

  DefaultPagination.mapDataToProps = {
    collectionType: ontola.collectionType,
    first: as.first,
    last: as.last,
  };

  DefaultPagination.propTypes = {
    collectionResource: linkType,
    first: linkType,
    last: linkType,
    setCurrentPage: PropTypes.func,
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
  register(getPagination(React.Fragment, allTopologiesExcept(cardAppendixTopology, pageTopology))),
  register(getPagination(CardAppendixContent, cardAppendixTopology)),
];
