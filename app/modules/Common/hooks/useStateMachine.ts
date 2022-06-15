import React from 'react';

export const any = Symbol('*');
export type Dispatcher<A> = (action: A) => void;
export type StateMachine<S, A> = Array<[currentState: S | S[] | typeof any, action: A, resultState: S]>;
export type StateMachineResult<S, A> = [state: State<S>, dispatch: Dispatcher<A>];

export class State<T> {
  private value: T;

  constructor(initalState: T) {
    this.value = initalState;
  }

  public is(val: T): boolean {
    return this.value === val;
  }

  public isAny(...vals: T[]): boolean {
    return vals.includes(this.value);
  }

  get raw(): T {
    return this.value;
  }
}

export const useStateMachine = <S, A>(predicates: StateMachine<S, A>, initialState: S): StateMachineResult<S, A> => {
  const [state, setState] = React.useState(new State(initialState));
  const [stateHistory, setStateHistory] = React.useState<S[]>([]);

  const maxHistoryLength = React.useMemo(() => {
    const lengths = predicates.map((p) => Array.isArray(p[0]) ? p[0].length : 1);

    return Math.max(...lengths);
  }, [predicates.length]);

  const dispatch = React.useCallback((action: A) => {
    let result: S | undefined;

    const filteredPredicates = predicates.filter((p) => p[1] === action);

    for (const [currentState, _, resultState] of filteredPredicates) {
      if (currentState === any) {
        result = resultState;
        continue;
      }

      if (Array.isArray(currentState)) {
        const history = [...stateHistory, state.raw];

        if (history.length < currentState.length) {
          continue;
        }

        const slicedHistory = history.slice(currentState.length * -1);
        const matches = slicedHistory.every((s, i) => currentState[i] === s);

        if (matches) {
          result = resultState;
        }

        continue;
      }

      if (state.is(currentState)) {
        result = resultState;
      }
    }

    if (result !== undefined) {
      setStateHistory((prevStateHistory) => [...prevStateHistory, state.raw].slice(maxHistoryLength * -1));
      setState(new State(result));
    }
  }, [state, maxHistoryLength]);

  return [state, dispatch];
};
