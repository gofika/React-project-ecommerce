import React from "react";
import { Controller, useFormContext } from "react-hook-form/";
import { TextField, Grid } from "@material-ui/core";

const FormInput = ({ name, label, required }) => {
  const { control } = useFormContext();
  return (
    <Grid item xs={12} sm={6}>
      <Controller
        //    as={TextField} doesNOT work!! ref Controller on https://github.com/react-hook-form/react-hook-form/discussions/3714
        // eslint-disable-next-line
        control={control}
        name={name}
        render={({ field }) => <TextField fullWidth label={label} required />}
      />
    </Grid>
  );
};

export default FormInput;
