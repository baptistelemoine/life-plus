import React, { useState } from "react";
import MainLayout from "./modules/main";
import AdminPage from "./modules/admin";
import Products from "./modules/admin/products";
import Discounts from "./modules/admin/discounts";
import Carts from "./modules/admin/carts";
import Shop from "./modules/shop";
import Cart from "./modules/cart";
import { SWRConfig } from "swr";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import CartContext from "./modules/shop/context";

export default function App() {
  const [cart, setCart] = useState();

  const handleCartUpdate = cart => {
    setCart(cart);
  };

  return (
    <SWRConfig
      value={{
        fetcher: (...args) => fetch(...args).then(res => res.json())
      }}
    >
      <Router>
        <CartContext.Provider value={cart}>
          <MainLayout>
            <Switch>
              <Route exact path="/">
                <Shop onCartUpdate={handleCartUpdate} />
              </Route>
              <Route exact path="/admin">
                <AdminPage>
                  <Products />
                  <Discounts />
                </AdminPage>
              </Route>
              <Route exact path="/carts">
                <AdminPage>
                  <Carts />
                </AdminPage>
              </Route>
              <Route exact path="/cart">
                <AdminPage>
                  <Cart />
                </AdminPage>
              </Route>
            </Switch>
          </MainLayout>
        </CartContext.Provider>
      </Router>
    </SWRConfig>
  );
}
