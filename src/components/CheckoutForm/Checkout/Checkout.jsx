import React, { useState, useEffect } from "react";
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
import { commerce } from "../../../lib/commerce";

const steps = ["Shipping address", "Payment details"];

const Checkout = ({ cart }) => {
  // eslint-disable-next-line
  const [activeStep, setActiveStep] = useState(0); // eslint-disable-next-line
  const [checkoutToken, setcheckoutToken] = useState(null);
  const classes = useStyles();

  // As soon as someone enters checkout process, we generate a checkoutToken
  useEffect(() => {
    const generateToken = async () => {
      // If the token is successfully created, we do something here, if not then catch and send the error.
      try {
        const token = await commerce.checkout.generateToken(cart.id, {
          type: "cart",
        });
        console.log(token);
        setcheckoutToken(token);
      } catch (error) {}
    };
    // In useEffect cant use async unless it's a new function
    generateToken();
  }, [cart]); //Whenever cart changes, generate new token

  const Form = () =>
    activeStep === 0 ? (
      <AddressForm checkoutToken={checkoutToken} />
    ) : (
      <PaymentForm />
    );
  // React render JSX first, then (componentDidMount) useEffect re-render if it needs to, get error when we havent called checkoutToken but AddressForm depends on it. Fix it with checkoutToken && Form
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
          {activeStep === steps.length ? (
            <Confirmation />
          ) : (
            //Only if we have checkoutToken , then we render the form
            checkoutToken && <Form />
          )}
        </Paper>
      </main>
    </>
  );
};

export default Checkout;
