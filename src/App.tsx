import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Theme from "./Theme";
import PageRegister from "./pages/PageRegister";
import store from "./store";

const App = () => (
  <BrowserRouter>
    <Theme>
      <Provider store={store}>
        <Switch>
          <Route path="/register" component={PageRegister} />
        </Switch>
      </Provider>
    </Theme>
  </BrowserRouter>
);

export default App;
