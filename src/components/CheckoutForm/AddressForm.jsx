import React, { useState, useEffect } from "react";
import {
  // eslint-disable-next-line
  InputLabel, // eslint-disable-next-line
  Select, // eslint-disable-next-line
  Button, // eslint-disable-next-line
  MenuItem,
  Typography,
  Grid,
} from "@material-ui/core";
import { useForm, FormProvider } from "react-hook-form";
import FormInput from "./CustomTextField";
import { commerce } from "../../lib/commerce";

const AddressForm = ({ checkoutToken }) => {
  const [shippingCountries, setShippingCountries] = useState([]); // eslint-disable-next-line
  const [shippingCountry, setShippingCount] = useState(""); // eslint-disable-next-line
  const [shippingSubdivisions, setSubdivisions] = useState([]); // eslint-disable-next-line
  const [shippingSubdivision, setSubdivision] = useState(""); // eslint-disable-next-line
  const [shippingOptions, setShippingOptions] = useState([]); // eslint-disable-next-line
  const [shippingOption, setShippingOption] = useState("");
  const methods = useForm();

  // CheckoutToken is generated when we get order, like receipt from the store. Need to create checkout TokenID in the checkout component where we have steps and all the other forms.
  const fetchShippingCountries = async (checkoutTokenId) => {
    const { countries } = await commerce.services.localeListShippingCountries(
      checkoutTokenId
    );
    console.log(countries);
    setShippingCountries(countries);
  };
  // When AddressForm renders, immediately fetch countries
  useEffect(() => {
    fetchShippingCountries(checkoutToken.id);
  }, []);
  return (
    <>
      <Typography variant="h6" gutterBottom>
        Shipping address
      </Typography>
      {/* ...methods Spead all the methods from react-hook-form */}
      <FormProvider {...methods}>
        <form onSubmit="">
          {/*  Grid Will be seperating or spacing all the input field */}
          <Grid container spacing={3}>
            {/* Inside each of Grid, have special material-ui field which has nice styling and fits the theme, so find a way to connect react-hook-form with material-ui text input */}
            <FormInput required name="first name" label="First Name" />
            <FormInput required name="last name" label="Last Name" />
            <FormInput required name="address1 name" label="Address" />
            <FormInput required name="email" label="Email" />
            <FormInput required name="city" label="City" />
            <FormInput required name="zipcode" label="ZIP/Postal code" />
          </Grid>
          {/* <Grid xs={12} sm={6}>
            <InputLabel>Shipping Country</InputLabel>
            <Select value={} fullWidth onChange={}>
              <MenuItem key={} value={}>
                Select me
              </MenuItem>
            </Select>
          </Grid>
          <Grid xs={12} sm={6}>
            <InputLabel>Shipping Country</InputLabel>
            <Select value={} fullWidth onChange={}>
              <MenuItem key={} value={}>
                Select me
              </MenuItem>
            </Select>
          </Grid>
          <Grid xs={12} sm={6}>
            <InputLabel>Shipping Country</InputLabel>
            <Select value={} fullWidth onChange={}>
              <MenuItem key={} value={}>
                Select me
              </MenuItem>
            </Select>
          </Grid> */}
        </form>
      </FormProvider>
    </>
  );
};

export default AddressForm;
