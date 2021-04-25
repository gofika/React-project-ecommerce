import React, { useState, useEffect } from "react";
import {
  Paper,
  Step,
  Stepper,
  StepLabel,
  Typography,
  CircularProgress,
  Divider,
  Button,
} from "@material-ui/core";

import useStyles from "./styles";
import AddressForm from "../AddressForm";
import PaymentForm from "../PaymentForm";
import { commerce } from "../../../lib/commerce";

const steps = ["Shipping address", "Payment details"];

const Checkout = ({ cart }) => {
  const [activeStep, setActiveStep] = useState(0);
  const [checkoutToken, setcheckoutToken] = useState(null);
  const [shippingData, setShippingData] = useState({});
  const classes = useStyles();

  // As soon as someone enters checkout process, we generate a checkoutToken
  useEffect(() => {
    const generateToken = async () => {
      // If the token is successfully created, we do something here, if not then catch and send the error.
      try {
        const token = await commerce.checkout.generateToken(cart.id, {
          type: "cart",
        });
        setcheckoutToken(token);
      } catch (error) {}
    };
    // In useEffect cant use async unless it's a new function
    generateToken();
  }, [cart]); //Whenever cart changes, generate new token

  const nextStep = () => setActiveStep((prevActiveStep) => prevActiveStep + 1);
  const backStep = () => setActiveStep((prevActiveStep) => prevActiveStep - 1);

  const next = (data) => {
    setShippingData(data);
    nextStep();
  };

  const Confirmation = () => {
    <div>Confirmation</div>;
  };

  const Form = () =>
    activeStep === 0 ? (
      <AddressForm checkoutToken={checkoutToken} next={next} />
    ) : (
      <PaymentForm shippingData={shippingData} checkoutToken={checkoutToken} />
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
