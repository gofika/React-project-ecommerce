import React from "react";
import {
  InputLabel,
  Select,
  Button,
  MenuItem,
  Typography,
  Grid,
} from "@material-ui/core";
import { useForm, FormProvider } from "react-hook-form";

const AddressForm = () => {
  const methods = useForm();
  return (
    <>
      <Typography variant="h6" gutterBottom>
        Shipping address
      </Typography>
      {/* ...methods Spead all the methods from react-hook-form */}
      <FormProvider {...methods}>
        <form onSubmit={}>
          {/*  Grid Will be seperating or spacing all the input field */}
          <Grid container spacing={3}></Grid>
        </form>
      </FormProvider>
    </>
  );
};

export default AddressForm;
