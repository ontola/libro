/**
 * @jest-environment jsdom
 */
import { act, renderHook } from '@testing-library/react-hooks';

import {
  StateMachine,
  any,
  useStateMachine,
} from '../useStateMachine';

enum Human {
  Idle = 1,
  Hungry,
  Sad,
  Happy,
  Dead,
  LookingForFood,
}

enum Action {
  LookForFood,
  EatBread,
  EatChocolate,
  FoundFood,
  DidNotFindFood,
  TimePasses,
}

const stateMachine: StateMachine<Human, Action> = [
  [any, Action.TimePasses, Human.Hungry],
  [Human.Hungry, Action.TimePasses, Human.Sad],
  [[Human.Hungry, Human.Sad], Action.TimePasses, Human.Dead],

  [any, Action.LookForFood, Human.LookingForFood],

  [Human.LookingForFood, Action.FoundFood, Human.Happy],

  [Human.LookingForFood, Action.DidNotFindFood, Human.Sad],

  [Human.Sad, Action.EatChocolate, Human.Happy],
];

describe('useStateMachine', () => {

  it('should have it\'s initial value set to the initial state', () => {
    const { result } = renderHook(() => useStateMachine(stateMachine, Human.Idle));
    const [state] = result.current;

    expect(state.is(Human.Idle)).toBe(true);
  });

  it('should follow its statemachine', () => {
    const { result } = renderHook(() => useStateMachine(stateMachine, Human.Hungry));

    act(() => {
      result.current[1](Action.TimePasses);
    });

    expect(result.current[0].is(Human.Sad)).toBe(true);

    act(() => {
      result.current[1](Action.EatChocolate);
    });

    expect(result.current[0].is(Human.Happy)).toBe(true);
  });

  it('should match on any and override with more specified values', () => {
    const { result } = renderHook(() => useStateMachine(stateMachine, Human.Idle));

    act(() => {
      result.current[1](Action.TimePasses);
    });

    expect(result.current[0].is(Human.Hungry)).toBe(true);

    act(() => {
      result.current[1](Action.TimePasses);
    });

    expect(result.current[0].is(Human.Sad)).toBe(true);
  });

  it('should match on history', () => {
    const { result } = renderHook(() => useStateMachine(stateMachine, Human.Hungry));

    act(() => {
      result.current[1](Action.TimePasses);
    });

    expect(result.current[0].is(Human.Sad)).toBe(true);

    act(() => {
      result.current[1](Action.TimePasses);
    });

    expect(result.current[0].is(Human.Dead)).toBe(true);
  });

  it('should not do anything that is not defined in the statemachine', () => {
    const { result } = renderHook(() => useStateMachine(stateMachine, Human.Hungry));

    act(() => {
      result.current[1](Action.EatBread);
    });

    expect(result.current[0].is(Human.Hungry)).toBe(true);
  });

  it('can use isAny to check for multiple states at once', () => {
    const checks = [Human.Idle, Human.Hungry];
    const { result } = renderHook(() => useStateMachine(stateMachine, Human.Idle));

    expect(result.current[0].isAny(...checks)).toBe(true);

    act(() => {
      result.current[1](Action.TimePasses);
    });

    expect(result.current[0].isAny(...checks)).toBe(true);
  });
});
