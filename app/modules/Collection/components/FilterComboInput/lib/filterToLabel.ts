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
import { LinkReduxLRSType } from 'link-redux';
import { IntlShape } from 'react-intl';

import { booleanTranslation } from '../../../../../translations/messages';
import ontola from '../../../../Kernel/ontology/ontola';

const filterKeyToName = (lrs: LinkReduxLRSType, filter: SomeNode): string => {
  const name = lrs.dig(filter, [ontola.filterKey, rdfs.label]);

  if (name.length === 0) {
    const filterKey = lrs.getResourceProperty(filter, ontola.filterKey);

    return isNamedNode(filterKey) ? term(filterKey) : '';
  }

  return getTermBestLang(name, (lrs as any).store.langPrefs)?.value;
};

export const filterToLabel = (lrs: LinkReduxLRSType, intl: IntlShape, filterTerm: SomeTerm): string | undefined => {

  if (isLiteral(filterTerm)) {
    if (filterTerm.datatype === xsd.xsdboolean) {
      return intl.formatMessage(booleanTranslation[filterTerm.value]);
    }

    return filterTerm.value;
  }

  const type = lrs.getResourceProperty(filterTerm, rdf.type);

  if (type === ontola.FilterField || type === ontola.CollectionFilter) {
    return filterKeyToName(lrs, filterTerm) ?? '';
  }

  const name = lrs.getResourceProperty(filterTerm as Node, [schema.name, rdfs.label]);

  return name?.value;
};
