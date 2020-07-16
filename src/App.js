import React, { useState, useEffect } from "react";
import { Route } from "react-router-dom";
import data from "./data";
import { ProductContext } from "./contexts/ProductContext";
import { CartContext } from "./contexts/CartContext";

// Components
import Navigation from "./components/Navigation";
import Products from "./components/Products";
import ShoppingCart from "./components/ShoppingCart";

function App() {
  const [products] = useState(data);
  const [cart, setCart] = useState([]);

  const addItem = (item) => {
    if (cart.indexOf(item) === -1) {
      setCart([...cart, item]);
    }
    return;
  };

  const removeItem = (itemId) => {
    const newCart = cart.filter((item) => {
      return itemId !== item.id;
    });
    setCart(newCart);
  };

  const saveToLocalStorage = (data) => {
    localStorage.setItem("cart", JSON.stringify(data));
  };

  const getLocalStorage = () => {
    const storage = localStorage.getItem("cart");
    const storedCart = JSON.parse(storage);
    console.log(storedCart);
  };

  //Local storage
  useEffect(() => {
    getLocalStorage();
    console.log("Cart updated");
    saveToLocalStorage(cart);
  }, [cart]);

  console.log(window.localStorage.cart);

  return (
    <div className="App">
      <ProductContext.Provider value={{ products, addItem }}>
        <CartContext.Provider value={{ cart, removeItem }}>
          <Navigation />

          {/* Routes */}

          <Route exact path="/">
            <Products />
          </Route>

          <Route path="/cart">
            <ShoppingCart />
          </Route>
        </CartContext.Provider>
      </ProductContext.Provider>
    </div>
  );
}

export default App;
