import * as schema from '@ontologies/schema';
import {
  useActionById,
  useFields,
  useGlobalIds,
  useLinkRenderContext,
  useLiterals,
} from 'link-redux';
import React, { MouseEventHandler } from 'react';

import { handle } from '../../../helpers/logging';
import ontola from '../../../ontology/ontola';
import { normalizeFontAwesomeIRI } from '../../Common/lib/iris';
import { OnDoneHandler, useDoneHandler } from '../views/helpers';

export interface OneClickProps {
  icon?: string;
  loading: boolean;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

const ignoreOnDone = () => null;

const useOneClickProps = (onDone?: OnDoneHandler): OneClickProps => {
  const { subject } = useLinkRenderContext();
  const actionHandler = useActionById(subject);

  const [entryPoint] = useGlobalIds(schema.target);
  const [oneClick] = useLiterals(ontola.oneClick);
  const [image] = useFields(entryPoint, schema.image);

  const [feedback, setFeedback] = React.useState(false);
  const onDoneHandler = useDoneHandler(onDone ?? ignoreOnDone);
  const actionIcon = image ? normalizeFontAwesomeIRI(image.value) : 'plus';

  const handleClick = React.useCallback<MouseEventHandler>(
    (e) => {
      e.preventDefault();

      if (!actionHandler) {
        throw new Error('No action available');
      }

      setFeedback(true);

      return actionHandler()?.catch((err) => {
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
