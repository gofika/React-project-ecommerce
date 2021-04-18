import React, { useState, useEffect } from "react";
import { Products, Navbar, Cart, Checkout } from "./components";
import { commerce } from "./lib/commerce";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

const App = () => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState({});

  const fetchProducts = async () => {
    //await the speciafic APIcall to the instance commerce, and destruct the data from the response which will be the products
    const { data } = await commerce.products.list();
    setProducts(data);
  };

  const fetchCart = async () => {
    setCart(await commerce.cart.retrieve());
  };

  //Accept two parameters and add to the cart, which are  product id and quantity
  const handleAddToCart = async (productId, quantity) => {
    // destrcture cart from response object

    const { cart } = await commerce.cart.add(productId, quantity);
    setCart(cart); // This is the cart after the items have been added
  };

  const handleUpdateCartQty = async (productId, quantity) => {
    const { cart } = await commerce.cart.update(productId, { quantity }); //quantity is the only one we update
    setCart(cart);
  };

  const handleRemoveFromCart = async (productId) => {
    const { cart } = await commerce.cart.remove(productId);
    setCart(cart);
  };

  const handleEmptyCart = async () => {
    const { cart } = await commerce.cart.empty();
    setCart(cart);
  };

  //useEffect hook to fetch the products immediately when the application loads
  useEffect(() => {
    fetchProducts();
    fetchCart();
  }, []); //dependency array set to empty, only runs at the start on the render
  console.log(cart);

  return (
    <Router>
      <div>
        <Navbar totalItems={cart.total_items} />
        <Switch>
          <Route exact path="/">
            <Products
              products={products}
              addToCart={handleAddToCart}
              handleUpdateCartQty
            />
          </Route>

          <Route exact path="/cart">
            <Cart
              cart={cart}
              handleUpdateCartQty={handleUpdateCartQty}
              handleRemoveFromCart={handleRemoveFromCart}
              handleEmptyCart={handleEmptyCart}
            />
          </Route>

          <Route exact path="/checkout">
            <Checkout cart={cart} />
          </Route>
        </Switch>
      </div>
    </Router>
  );
};

export default App;
