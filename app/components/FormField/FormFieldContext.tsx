import React from 'react';

import { FormFieldProps } from './FormField';

type FormFieldContext = Omit<FormFieldProps, 'className' | 'combinedComponent' | 'whitelisted'>;

export const formFieldContext = React.createContext<FormFieldContext>(undefined as any);
