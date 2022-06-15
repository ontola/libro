import { StateMachine, any } from '../../../Common/hooks/useStateMachine';

export enum CardState {
  Dragging,
  Idle,
  VotingYes,
  VotingNo,
  IdleYes,
  IdleNo,
  ShowInfoFace,
  FlipToFront,
}

export enum CardAction {
  DragStart,
  ReleaseYes,
  ReleaseNo,
  ReleaseMiddle,
  VoteYesButton,
  VoteNoButton,
  ShowInfoButton,
  IdleTimeout,
  FlipDone,
}

export enum HoverSide {
  Yes,
  No,
}

export const cardStateMachine: StateMachine<CardState, CardAction> = [
  [any, CardAction.DragStart, CardState.Dragging],

  [CardState.Dragging, CardAction.ReleaseYes, CardState.VotingYes],
  [[CardState.IdleYes, CardState.Dragging], CardAction.ReleaseYes, CardState.Idle],

  [CardState.Dragging, CardAction.ReleaseNo, CardState.VotingNo],
  [[CardState.IdleNo, CardState.Dragging], CardAction.ReleaseNo, CardState.Idle],

  [CardState.Dragging, CardAction.ReleaseMiddle, CardState.Idle],

  [CardState.Idle, CardAction.VoteYesButton, CardState.VotingYes],
  [CardState.IdleNo, CardAction.VoteYesButton, CardState.VotingYes],
  [CardState.IdleYes, CardAction.VoteYesButton, CardState.Idle],

  [CardState.Idle, CardAction.VoteNoButton, CardState.VotingNo],
  [CardState.IdleYes, CardAction.VoteNoButton, CardState.VotingNo],
  [CardState.IdleNo, CardAction.VoteNoButton, CardState.Idle],

  [any, CardAction.ShowInfoButton, CardState.ShowInfoFace],
  [CardState.ShowInfoFace, CardAction.ShowInfoButton, CardState.FlipToFront],

  [any, CardAction.FlipDone, CardState.Idle],
  [[CardState.IdleYes, CardState.ShowInfoFace, CardState.FlipToFront], CardAction.FlipDone, CardState.IdleYes],
  [[CardState.IdleNo, CardState.ShowInfoFace, CardState.FlipToFront], CardAction.FlipDone, CardState.IdleNo],

  [CardState.VotingYes, CardAction.IdleTimeout, CardState.IdleYes],

  [CardState.VotingNo, CardAction.IdleTimeout, CardState.IdleNo],
];
