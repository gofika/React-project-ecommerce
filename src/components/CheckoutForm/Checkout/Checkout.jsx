import React, { useState } from "react";
import {
  Paper,
  Step,
  Stepper,
  StepLabel,
  Typography, // eslint-disable-next-line
  CircularProgress, // eslint-disable-next-line
  Divider, // eslint-disable-next-line
  Button,
} from "@material-ui/core";

import useStyles from "./styles";
import AddressForm from "../AddressForm";
import PaymentForm from "../PaymentForm";
import Confirmation from "../Confirmation";

const steps = ["Shipping address", "Payment details"];

const Checkout = () => {
  const classes = useStyles(); // eslint-disable-next-line
  const [activeStep, setActiveStep] = useState(0);
  const Form = () => (activeStep === 0 ? <AddressForm /> : <PaymentForm />);

  return (
    <>
      <div className={classes.toolbar} />
      <main className={classes.layout}>
        <Paper className={classes.paper}>
          <Typography variant="h4" align="center">
            Check Out
          </Typography>
          <Stepper activeStep={activeStep} className={classes.stepper}>
            {steps.map((step) => (
              <Step key={step}>
                <StepLabel>{step}</StepLabel>
              </Step>
            ))}
          </Stepper>
          {activeStep === steps.length ? <Confirmation /> : <Form />}
        </Paper>
      </main>
    </>
  );
};

export default Checkout;
