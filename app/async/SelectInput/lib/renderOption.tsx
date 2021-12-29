import { SomeTerm, isLiteral } from '@ontologies/core';
import { Resource } from 'link-redux';
import React from 'react';

export const renderOption = (className: string) => (item: SomeTerm): JSX.Element => {
  if (isLiteral(item.termType)) {
    return (
      <option
        className={className}
        key={item.value}
        value={item.value}
      >
        {item.value}
      </option>
    );
  }

  return (
    <Resource
      element="div"
      key={item.value}
      subject={item}
    />
  );
};
