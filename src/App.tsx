<<<<<<< HEAD
import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import RoutesPrivate from "./routes/PrivateRoute";
import store from "./store";
import Theme from "./Theme";
import LocalStorageActions from "./store/actions/LocalStorageActions";
import PageRegister from "./pages/PageRegister";
import PageDeposit from "./pages/PageDeposit";
import PageHome from "./pages/PageHome";
import PageLogin from "./pages/PageLogin";
=======
import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import RoutesPrivate from './routes/PrivateRoute';
import store from './store';
import Theme from './Theme';
import LocalStorageActions from './store/actions/LocalStorageActions';
import PageRegister from './pages/PageRegister';
import PageDeposit from './pages/PageDeposit';
import PageHome from './pages/PageHome';
import PageLogin from './pages/PageLogin';
>>>>>>> 46ed5b324059a9139e415c80c87784697bfbd27c

store.dispatch({
  type: LocalStorageActions.LOAD_LOCAL_STORAGE,
});

const App = () => {
  return (
    <BrowserRouter>
      <Provider store={store}>
        <Theme>
          <Switch>
            <Route path="/login" component={PageLogin} />
            <Route path="/register" component={PageRegister} />
            <RoutesPrivate path="/" exact component={PageHome} />
            <RoutesPrivate path="/deposit" component={PageDeposit} />
          </Switch>
        </Theme>
      </Provider>
    </BrowserRouter>
  );
};

export default App;
