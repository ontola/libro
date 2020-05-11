import { useLRS } from 'link-redux';
import React from 'react';
import { useHistory } from 'react-router';

import { retrievePath } from '../../helpers/iris';
import app from '../../ontology/app';

const MAX_IN_STORAGE = 5;
export const MAX_POSTAL_DIGITS = 9999;
export const MIN_POSTAL_DIGITS = 1000;

export const postalCodeIri = (postalDigits) => app.ns(`postal_codes/${postalDigits}`);

export const useVisitPostalCode = () => {
  const lrs = useLRS();
  const history = useHistory();
  const [recentPostalCodes, addRecentPostalCode] = React.useMemo(() => {
    const rawFromStorage = localStorage.getItem('recentPostalDigits');
    const current = rawFromStorage ? JSON.parse(rawFromStorage) : [];
    const add = (value) => {
      const newValue = current.filter((v) => (v !== value));
      newValue.unshift(value);
      localStorage.setItem('recentPostalDigits', JSON.stringify(newValue.slice(0, MAX_IN_STORAGE)));
    };

    return [current, add];
  }, []);

  const visitPostalCode = React.useCallback((digits) => {
    addRecentPostalCode(digits);
    lrs.getEntity(postalCodeIri(digits)).then(() => {
      history.push(retrievePath(postalCodeIri(digits)));
    });
  }, []);

  return {
    recentPostalCodes,
    visitPostalCode,
  };
};
