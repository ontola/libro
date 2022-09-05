import { Quadruple } from '@ontologies/core';
import { createMessageProcessor } from 'link-lib';
import { LinkReduxLRSType } from 'link-redux';

import { deltaToMessageStream } from './deltaToMessageStream';

export interface DeltaProcessors {
  deltas: Quadruple[][];
  flush(): Set<string>;
  processDelta(delta: Quadruple[]): void;
  queueDelta(delta: Quadruple[]): void;
}

function messageDeltaProcessor(lrs: LinkReduxLRSType): DeltaProcessors {
  return {
    deltas: [] as Quadruple[][],

    flush(): Set<string> {
      const nextDeltas = this.deltas;
      this.deltas = [];

      for (const delta of nextDeltas) {
        try {
          this.processDelta(delta);
        } catch (e) {
          lrs.report(e as Error);
        }
      }

      // Records will be updated via operations on the store.
      return new Set();
    },

    processDelta(delta: Quadruple[]): void {
      const process = createMessageProcessor(lrs);

      const messages = deltaToMessageStream(delta);

      for (const message of messages) {
        process(message);
      }
    },

    queueDelta(delta: Quadruple[]) {
      this.deltas.push(delta);
    },
  };
}

export default messageDeltaProcessor;
