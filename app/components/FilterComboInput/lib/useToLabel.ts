import {
  Node,
  SomeTerm,
  isLiteral,
  isNamedNode,
} from '@ontologies/core';
import * as rdf from '@ontologies/rdf';
import * as rdfs from '@ontologies/rdfs';
import * as schema from '@ontologies/schema';
import * as xsd from '@ontologies/xsd';
import { term } from '@rdfdev/iri';
import { SomeNode, getTermBestLang } from 'link-lib';
import { useLRS } from 'link-redux';
import React from 'react';
import { useIntl } from 'react-intl';

import ontola from '../../../ontology/ontola';
import { booleanTranslation } from '../../../translations/messages';

export const useToLabel = () => {
  const intl = useIntl();
  const lrs = useLRS();

  const filterKeyToName = (filter: SomeNode): string => {
    const name = lrs.dig(filter, [ontola.filterKey, rdfs.label]);

    if (name.length === 0) {
      const filterKey = lrs.getResourceProperty(filter, ontola.filterKey);

      return isNamedNode(filterKey) ? term(filterKey) : '';
    }

    return getTermBestLang(name, (lrs as any).store.langPrefs)?.value;
  };

  return React.useCallback((filterTerm: SomeTerm) => {
    if (isLiteral(filterTerm)) {
      if (filterTerm.datatype === xsd.xsdboolean) {
        return intl.formatMessage(booleanTranslation[filterTerm.value]);
      }

      return filterTerm.value;
    }

    const type = lrs.getResourceProperty(filterTerm, rdf.type);

    if (type === ontola.FilterField || type === ontola.CollectionFilter || type === ontola.Filter) {
      return filterKeyToName(filterTerm) ?? '';
    }

    const name = lrs.getResourceProperty(filterTerm as Node, [schema.name, rdfs.label]);

    return name?.value;
  }, [lrs, intl]);
};
