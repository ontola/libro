import { ToolbarButtonProps } from '@udecode/slate-plugins';

/**
 * Slate distinguishes between commands and operations,
 * commands being the high-level user actions,
 * and operations the low-level actions that occur while invoking commands.
 */
export interface Command {
  apply?: (...args: any) => any;
  button?: (props: CommandButtonProps) => JSX.Element;
  buttonIndex?: number;
}

export interface Commands {
  [name: string]: Command | undefined;
}

export interface CommandButtonProps extends Omit<ToolbarButtonProps, 'icon'> {}

export interface CommandWithKey extends Command {
  key: string;
}
