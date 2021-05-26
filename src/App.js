import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import { EditProduct } from "./features/products/EditProduct";
import React from "react";
import { ProductsList } from "./features/products/ProductsList";

export default function App() {
  return (
    <Router>
      <div>
        <Switch>
          <Route path="/edit-product">
            <EditProduct />
          </Route>
          <Route path="/">
            <ProductsList />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}
