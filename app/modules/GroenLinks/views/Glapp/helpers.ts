import { NamedNode } from '@ontologies/core';
import React from 'react';
import { useNavigate } from 'react-router';

import app from '../../../../ontology/app';
import { retrievePath } from '../../../Common/lib/iris';

const MAX_IN_STORAGE = 5;

export const postalCodeIri = (postalDigits: string): NamedNode => app.ns(`postal_codes/${postalDigits}`);

type VisitPostalCode = [string[], (digits: number) => void];

export const useVisitPostalCode = (): {
  recentPostalCodes: string[];
  visitPostalCode: (digits: string | number) => void;
} => {
  const navigate = useNavigate();
  const [recentPostalCodes, addRecentPostalCode] = React.useMemo<VisitPostalCode>(() => {
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
    navigate(retrievePath(postalCodeIri(digits)) ?? '#');
  }, []);

  return {
    recentPostalCodes,
    visitPostalCode,
  };
};
