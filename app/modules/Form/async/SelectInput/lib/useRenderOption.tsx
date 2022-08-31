import { SomeTerm, isLiteral } from '@ontologies/core';
import { Resource } from 'link-redux';
import React from 'react';

const wrappedOption = (props: unknown, option: SomeTerm, component: JSX.Element): JSX.Element => (
  <li
    {...props}
    key={option.value}
  >
    {component}
  </li>
);

const useRenderOption = (className: string): (props: unknown, option: SomeTerm) => JSX.Element => React.useCallback((props: unknown, option: SomeTerm) => {
  if (isLiteral(option)) {
    return wrappedOption(props, option,
      <option
        className={className}
        value={option.value}
      >
        {option.value}
      </option>,
    );
  }

  return wrappedOption(props, option,
    <Resource
      element="div"
      subject={option}
    />,
  );
}, []);

export default useRenderOption;
