import { NamedNode } from '@ontologies/core';
import React from 'react';
import { useNavigate } from 'react-router';

import { retrievePath } from '../../../Common/lib/iris';
import app from '../../../Core/ontology/app';

const MAX_IN_STORAGE = 5;

export const postalCodeIri = (postalDigits: string | number): NamedNode => app.ns(`postal_codes/${postalDigits}`);

export type VisitPostalCode = (digits: string | number) => void;

export const useVisitPostalCode = (): {
  recentPostalCodes: string[];
  visitPostalCode: (digits: string | number) => void;
} => {
  const navigate = useNavigate();
  const [recentPostalCodes, addRecentPostalCode] = React.useMemo<[string[], VisitPostalCode]>(() => {
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

  const visitPostalCode = React.useCallback<VisitPostalCode>((digits) => {
    addRecentPostalCode(digits);
    navigate(retrievePath(postalCodeIri(digits)) ?? '#');
  }, []);

  return {
    recentPostalCodes,
    visitPostalCode,
  };
};
