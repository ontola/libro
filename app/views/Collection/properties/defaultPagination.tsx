import * as as from '@ontologies/as';
import rdf, {
  NamedNode,
  SomeTerm,
} from '@ontologies/core';
import {
  FC,
  register,
  useIds,
  useLinkRenderContext,
  useNumbers,
} from 'link-redux';
import React from 'react';
import { useIntl } from 'react-intl';

import Button, { ButtonTheme } from '../../../components/Button';
import CardContent from '../../../components/Card/CardContent';
import { useCollectionOptions } from '../../../components/Collection/CollectionProvider';
import ontola from '../../../ontology/ontola';
import { allTopologiesExcept } from '../../../topologies';
import { cardAppendixTopology } from '../../../topologies/Card/CardAppendix';
import CardRow from '../../../topologies/Card/CardRow';
import { pageTopology } from '../../../topologies/Page';
import { collectionMessages } from '../../../translations/messages';
import { CollectionTypes } from '../types';

export interface PaginationProps {
  linkedProp: SomeTerm;
}

interface PaginationButtonProps {
  active?: boolean;
  ariaLabel?: string;
  disabled?: boolean;
  icon?: string;
  key?: string;
  label?: string;
  url?: string;
}

const pageProp = 'page';

const usePageButtons = (): JSX.Element[] | null => {
  const { formatMessage } = useIntl();
  const { subject } = useLinkRenderContext();
  const {
    currentCollectionPages,
    setCollectionResource,
  } = useCollectionOptions();

  const [first] = useIds(as.first);
  const [last] = useIds(as.last);
  const currentOrFirst = currentCollectionPages?.[0] ?? first;
  const [pageItemCount] = useNumbers(currentOrFirst, as.totalItems);

  return React.useMemo(() => {
    if (!currentOrFirst) {
      return null;
    }

    const currentPageUrl = new URL(currentOrFirst.value);
    const currentPageParam = currentPageUrl.searchParams.get(pageProp);
    const currentPageNr = currentPageParam ? Number.parseInt(currentPageParam, 10) : 1;

    const firstPageParam = first ? new URL(first.value).searchParams.get(pageProp) : undefined;
    const firstPage = firstPageParam ? Number.parseInt(firstPageParam, 10) : 1;
    const lastPageParam = last ? new URL(last.value).searchParams.get(pageProp) : undefined;
    const lastPage = lastPageParam ? Number.parseInt(lastPageParam, 10) : undefined;

    if (firstPage && lastPage) {
      if (firstPage > lastPage) {
        throw new Error('First page is higher than last page or last is undefined');
      }

      // Don't show the pagination buttons if there's just one page
      if (firstPage === lastPage) {
        return null;
      }
    } else if (pageItemCount === 0) {
      return null;
    }

    const nextPage = () => {
      currentPageUrl.searchParams.set(pageProp, (currentPageNr + 1).toString());

      return currentPageUrl.href;
    };

    const previousPage = () => {
      currentPageUrl.searchParams.set(pageProp, (currentPageNr - 1).toString());

      return currentPageUrl.href;
    };

    const paginationButton = ({
      active,
      ariaLabel,
      disabled = false,
      icon,
      key,
      label,
      url,
    }: PaginationButtonProps = {}) => {
      const className = active ? 'Button--active' : undefined;

      return (
        <Button
          small
          ariaLabel={ariaLabel}
          className={className}
          disabled={disabled}
          icon={icon}
          key={`${key}-${subject.value}-page-switcher-${key}`}
          theme={ButtonTheme.Pagination}
          onClick={(e) => {
            e.preventDefault();
            setCollectionResource(rdf.namedNode(url));
          }}
        >
          {label}
        </Button>
      );
    };

    const singlePageButton = (page: number) => {
      currentPageUrl.searchParams.set(pageProp, page.toString());
      const isCurrent = currentOrFirst.value === currentPageUrl.toString();

      return paginationButton({
        active: isCurrent,
        disabled: isCurrent,
        key: page.toString(),
        label: page.toString(),
        url: currentPageUrl.toString(),
      });
    };

    const pages = [];
    pages.push(paginationButton({
      ariaLabel: formatMessage(collectionMessages.nextLabel),
      disabled: currentPageNr === firstPage,
      icon: 'arrow-left',
      key: 'prev',
      url: previousPage(),
    }));

    if (firstPage && lastPage) {
      pages.push(singlePageButton(firstPage));

      const span = 3;
      const spanFrom = Math.max(firstPage + 1, currentPageNr - span);
      const spanTo = Math.min(currentPageNr + span, lastPage - 1);

      if (spanFrom > firstPage + 1) {
        pages.push(
          <span>
            ...
          </span>,
        );
      }

      for (let i = spanFrom; i <= spanTo; i++) {
        pages.push(singlePageButton(i));
      }

      if (spanTo < lastPage - 1) {
        pages.push(
          <span>
            ...
          </span>,
        );
      }

      pages.push(singlePageButton(lastPage));
    }

    pages.push(paginationButton({
      ariaLabel: formatMessage(collectionMessages.nextLabel),
      disabled: currentPageNr === lastPage || pageItemCount === 0,
      icon: 'arrow-right',
      key: 'next',
      url: nextPage(),
    }));

    return pages;
  }, [
    currentOrFirst,
    first,
    last,
    setCollectionResource,
    subject,
  ]);
};

const getPagination = (Wrapper: React.ElementType, topology: NamedNode | NamedNode[]) => {
  const DefaultPagination: FC<PaginationProps> = () => {
    const pageButtons = usePageButtons();

    if (!pageButtons || pageButtons.length === 0) {
      return null;
    }

    return (
      <Wrapper>
        <div
          className="pagination-wrapper"
          data-testid="paginationWrapper"
        >
          {pageButtons}
        </div>
      </Wrapper>
    );
  };

  DefaultPagination.type = CollectionTypes;

  DefaultPagination.property = ontola.defaultPagination;

  DefaultPagination.topology = topology;

  return DefaultPagination;
};

export const CardAppendixContent: React.FC = ({ children }) => (
  <CardRow
    backdrop
    borderTop
  >
    <CardContent>
      {children}
    </CardContent>
  </CardRow>
);

export default [
  register(getPagination(React.Fragment, allTopologiesExcept(cardAppendixTopology, pageTopology))),
  register(getPagination(CardAppendixContent, cardAppendixTopology)),
];
