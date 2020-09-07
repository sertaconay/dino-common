import { HTMLAttributes } from 'react';
import { FormikProps, FieldInputProps, FormikValues } from 'formik';

class T {}

export interface StyledProps {
  error: string;
}

export type HighlightsSelectOptionTypes = {
  value: string;
  text: string;
};

export interface HighlightsSelectProps extends HTMLAttributes<T> {
  defaultOption: HighlightsSelectOptionTypes;
  setFieldValue: () => unknown;
  error: string;
  handleChange: () => unknown;
  name: string;
  options?: HighlightsSelectOptionTypes[];
  value?: string | number;
  helperText?: string;
  label?: string;
  field: FieldInputProps<string>;
  form: FormikProps<FormikValues>;
}

export interface DropdownProps {
  options: HighlightsSelectOptionTypes[];
  selectedOption: string | undefined;
  handleDropdownClick: (item: { value: string, text: string }) => void;
}

export interface StyledDropdownProps {
  selectedOption: string;
}
