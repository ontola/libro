import { Quad } from '@ontologies/core';
import { DataProcessor } from 'link-lib';
import { LinkReduxLRSType } from 'link-redux';

export const HTTP_RETRY_WITH = 449;

export interface SubmitDataProcessor extends Omit<DataProcessor, 'feedResponse' | 'execExecHeader' > {
  feedResponse:  (res: Response) => Promise<Quad[]>;
  execExecHeader: (header: string | null, args: unknown) => void;
}

export type LRS = LinkReduxLRSType<unknown, SubmitDataProcessor>;

export const handleHTTPRetry = (lrs: LRS, e: { response: Response }, onDone: () => Promise<void>): void => {
  const actionsHeader = e.response.headers.get('Exec-Action');

  lrs.api.execExecHeader(actionsHeader, { onDone });
};
