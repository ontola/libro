import { NamedNode } from 'link-lib/dist-types/rdf';
import React from 'react';
import { useHistory } from 'react-router';

import { retrievePath } from '../../helpers/iris';
import app from '../../ontology/app';

const MAX_IN_STORAGE = 5;
export const MAX_POSTAL_DIGITS = 9999;
export const MIN_POSTAL_DIGITS = 1000;

export const postalCodeIri = (postalDigits: string): NamedNode => app.ns(`postal_codes/${postalDigits}`);

export const useVisitPostalCode = (): {
  recentPostalCodes: string[];
  visitPostalCode: (digits: string | number) => void;
} => {
  const history = useHistory();
  const [recentPostalCodes, addRecentPostalCode] = React.useMemo(() => {
    if (!__CLIENT__) {
      return [[], () => null];
    }
    const rawFromStorage = localStorage.getItem('recentPostalDigits');
    const current = rawFromStorage ? JSON.parse(rawFromStorage) : [];

    const add = (value: string | number) => {
      const normalizedValue = value.toString();
      const newValue = current.filter((v: string) => (v !== normalizedValue));
      newValue.unshift(normalizedValue);
      localStorage.setItem('recentPostalDigits', JSON.stringify(newValue.slice(0, MAX_IN_STORAGE)));
    };

    return [current, add];
  }, []);

  const visitPostalCode = React.useCallback((digits) => {
    addRecentPostalCode(digits);
    history.push(retrievePath(postalCodeIri(digits)) ?? '#');
  }, []);

  return {
    recentPostalCodes,
    visitPostalCode,
  };
};
