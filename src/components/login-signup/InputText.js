import React from 'react';
import { TextField } from '@mui/material';

export function InputText({ field, form: { errors, touched }, ...props }) {
  return (
    <>
      <TextField
        size="small"
        variant={'outlined'}
        fullWidth
        inputProps={{ style: { backgroundColor: '#fff' } }}
        error={touched[field.name] && Boolean(errors[field.name])}
        helperText={touched[field.email] && errors[field.email]}
        {...props}
        {...field}
      />
    </>
  );
}
