import { NamedNode } from '@ontologies/core';
import * as schema from '@ontologies/schema';
import {
  ReturnType,
  useAction,
  useProperty,
  useResourceProperty,
  useSubject,
} from 'link-redux';
import React from 'react';

import { normalizeFontAwesomeIRI } from '../helpers/iris';
import { handle } from '../helpers/logging';
import ontola from '../ontology/ontola';
import { OnDoneHandler, useDoneHandler } from '../views/Action/helpers';

export interface OneClickProps {
  icon?: string;
  loading: boolean;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

const ignoreOnDone = () => null;

const useOneClickProps = (onDone?: OnDoneHandler): OneClickProps => {
  const [[subject]] = useSubject();
  const actionHandler = useAction(subject);

  const [entryPoint] = useProperty(schema.target) as NamedNode[];
  const oneClick = useProperty(ontola.oneClick, { returnType: ReturnType.Literal });
  const [image] = useResourceProperty(entryPoint, schema.image);

  const [feedback, setFeedback] = React.useState(false);
  const onDoneHandler = useDoneHandler(onDone ?? ignoreOnDone);
  const actionIcon = image ? normalizeFontAwesomeIRI(image.value) : 'plus';

  const handleClick = React.useCallback(
    (e) => {
      e.preventDefault();
      setFeedback(true);

      return actionHandler().catch((err) => {
        handle(err);
      }).then(onDoneHandler).finally(() => {
        setFeedback(false);
      });
    },
    [subject],
  );

  return React.useMemo<OneClickProps>(() => ({
    icon: feedback ? 'spinner' : actionIcon,
    loading: feedback,
    onClick: oneClick ? handleClick : undefined,
  }), [handleClick, feedback, actionIcon]);

};

export default useOneClickProps;
