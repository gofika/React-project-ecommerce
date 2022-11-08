import React from "react";
import {
  AppBar,
  Toolbar,
  IconButton, // eslint-disable-next-line
  Menu, // eslint-disable-next-line
  MenuItem,
  Typography,
  Badge,
} from "@material-ui/core";
import { ShoppingCart } from "@material-ui/icons";

import logo from "../../assets/logo.png";
import useStyles from "./styles";

const Navbar = ({ totalItems }) => {
  const classes = useStyles();
  return (
    <>
      <AppBar position="fixed" color="inherit" className={classes.appBar}>
        <Toolbar>
          <Typography variant="h6" color="inherit" className={classes.title}>
            <img
              src={logo}
              alt="Merca Prime"
              height="25px"
              className={classes.image}
            />
            Merca Prime
          </Typography>
          <div className={classes.grow} />
          <div className={classes.button}>
            <IconButton aria-label="Show Cart Item" color="inherit">
              <Badge color="secondary" badgeContent={totalItems}>
                <ShoppingCart />
              </Badge>
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
    </>
  );
};

export default Navbar;
