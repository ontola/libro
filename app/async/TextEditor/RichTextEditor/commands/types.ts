import { ToolbarButtonProps } from '@udecode/slate-plugins';

// Slate distinguishes between commands and operations,
// commands being the high-level user actions,
// and operations the low-level actions that occur while invoking commands.
export interface Command {
  button?: (props: CommandButtonProps) => JSX.Element;
  buttonNew?: JSX.Element;
  buttonIndex?: number;
  apply?: (...args: any) => any;
}

export interface Commands {
  [name: string]: Command | undefined;
}

export interface CommandButtonProps extends Omit<ToolbarButtonProps, 'icon'> {}
