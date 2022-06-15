import { Quadruple } from '@ontologies/core';
import { DataProcessor } from 'link-lib';
import { LinkReduxLRSType } from 'link-redux';

import { OnDoneHandler } from '../../Action/views/helpers';

export const HTTP_RETRY_WITH = 449;

export interface SubmitDataProcessor extends Omit<DataProcessor, 'feedResponse' | 'execExecHeader' > {
  feedResponse:  (res: Response) => Promise<Quadruple[]>;
  execExecHeader: (header: string | null, args: unknown) => void;
}

export type LRS = LinkReduxLRSType<unknown, SubmitDataProcessor>;

export const handleHTTPRetry = (lrs: LRS, e: { response: Response }, onDone: OnDoneHandler): void => {
  const actionsHeader = e.response.headers.get('Exec-Action');

  lrs.api.execExecHeader(actionsHeader, { onDone });
};
