import React from "react";
import MainLayout from "./modules/main";
import AdminPage from "./modules/admin";
import Products from "./modules/admin/products";
import Shop from "./modules/shop";
import { SWRConfig } from "swr";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

export default function App() {
  return (
    <SWRConfig
      value={{
        fetcher: (...args) => fetch(...args).then(res => res.json())
      }}
    >
      <Router>
        <MainLayout>
          <Switch>
            <Route exact path="/">
              <Shop />
            </Route>
            <Route exact path="/admin">
              <AdminPage>
                <Products />
              </AdminPage>
            </Route>
          </Switch>
        </MainLayout>
      </Router>
    </SWRConfig>
  );
}
