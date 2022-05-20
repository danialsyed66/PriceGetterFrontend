import React from 'react';
import { Checkbox } from '@mui/material';

export function Checkboxmui({ field, form: { errors, touched }, ...props }) {
  return (
    <>
      <Checkbox
        sx={{ '& .MuiSvgIcon-root': { fontSize: 28 } }}
        {...props}
        {...field}
      />
    </>
  );
}
