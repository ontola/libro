import { ToolbarButtonProps } from '@udecode/plate-toolbar';
import React from 'react';
import { MessageDescriptor } from 'react-intl';

/**
 * Slate distinguishes between commands and operations,
 * commands being the high-level user actions,
 * and operations the low-level actions that occur while invoking commands.
 */
export interface Command {
  buttonIndex?: number;
  buttonGroup?: string;
}

export interface ComponentCommand extends Command {
  button: React.ComponentType | React.ExoticComponent;
}

export interface ParameterizedCommand extends Command {
  // buttonComponent: React.ComponentType<any> | React.ExoticComponent<any>;
  child: React.ComponentType<any> | React.ExoticComponent<any>;
  key: string;
  title: string | MessageDescriptor;
}

export interface Commands {
  [name: string]: ComponentCommand | ParameterizedCommand | undefined;
}

export type CommandButtonProps = Omit<ToolbarButtonProps, 'icon'>;
