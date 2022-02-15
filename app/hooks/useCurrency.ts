import * as schema from '@ontologies/schema';
import {
  LaxNode,
  dig,
  useStrings,
} from 'link-redux';

const CURRENCY_PREDICATES = [schema.currency, schema.priceCurrency];

const useCurrency = (object: LaxNode): string => {
  const [currency] = useStrings(object, CURRENCY_PREDICATES);
  const [nestedCurrency] = useStrings(object, dig(CURRENCY_PREDICATES, schema.identifier));

  return currency ?? nestedCurrency ?? 'EUR';
};

export default useCurrency;
