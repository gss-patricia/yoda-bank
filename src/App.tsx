import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import store from "./store";
import Theme from "./Theme";
import PageRegister from "./pages/PageRegister";
import PageDeposit from "./pages/PageDeposit";
import PageHome from "./pages/PageHome";
import PageLogin from "./pages/PageLogin";

const App = () => (
  <BrowserRouter>
    <Theme>
      <Switch>
        <Provider store={store}>
          <Route exact path="/">
            <Redirect to="/login" />
          </Route>
          <Route path="/login" component={PageLogin} />
          <Route path="/register" component={PageRegister} />
          <Route path="/deposit" component={PageDeposit} />
          <Route path="/home" component={PageHome} />
        </Provider>
      </Switch>
    </Theme>
  </BrowserRouter>
);

export default App;
