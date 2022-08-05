import { useLRS } from 'link-redux';
import React, { MouseEventHandler } from 'react';

import { useOnClickToOnKeyUp } from '../../lib/keyboard';
import { OpenWindow } from '../../middleware/actions';

export interface ExternalLinkProps {
  className?: string;
  href?: string;
  ref?: any;
  role?: string;
  onClick?: MouseEventHandler;
  id?: string;
  tabIndex?: number;
}

const ExternalLink = React.forwardRef<HTMLAnchorElement, React.PropsWithChildren<ExternalLinkProps>>(
  ({ children, ...otherProps },
    ref,
  ): JSX.Element => {
    const lrs = useLRS();
    const onClick = React.useCallback(() => {
      lrs.actions.get(OpenWindow)(otherProps.href!);
    }, [otherProps.href]);
    const onKeyUp = useOnClickToOnKeyUp(onClick);

    return (
      <a
        {...otherProps}
        ref={ref}
        rel="nofollow noopener noreferrer"
        target="_blank"
        onClick={onClick}
        onKeyUp={onKeyUp}
      >
        {children}
      </a>
    );
  });

ExternalLink.displayName = 'ExternalLink';

export default ExternalLink;
