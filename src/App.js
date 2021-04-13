import React, { useState, useEffect } from "react";
// eslint-disable-next-line
import { Products, Navbar, Cart } from "./components";
import { commerce } from "./lib/commerce";

const App = () => {
  // eslint-disable-next-line
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
  // eslint-disable-next-line
  const handleAddToCart = async (productId, quantity) => {
    const item = await commerce.cart.add(productId, quantity);
    setCart(item.cart); // This is the cart after the items have been added
  };

  //useEffect hook to fetch the products immediately when the application loads
  useEffect(() => {
    fetchProducts();
    fetchCart();
  }, []); //dependency array set to empty, only runs at the start on the render

  console.log(cart);

  return (
    <div>
      <Navbar totalItems={cart.total_items} />
      {/* <Products products={products} addToCart={handleAddToCart} /> */}
      <Cart cart={cart} />
    </div>
  );
};

export default App;
