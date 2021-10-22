import * as schema from '@ontologies/schema';
import {
  useAction,
  useFields,
  useGlobalIds,
  useLiterals,
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
  const actionHandler = useAction();

  const [entryPoint] = useGlobalIds(schema.target);
  const [oneClick] = useLiterals(ontola.oneClick);
  const [image] = useFields(entryPoint, schema.image);

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
    [actionHandler],
  );

  return React.useMemo<OneClickProps>(() => ({
    icon: feedback ? 'spinner' : actionIcon,
    loading: feedback,
    onClick: oneClick ? handleClick : undefined,
  }), [handleClick, feedback, actionIcon]);

};

export default useOneClickProps;
