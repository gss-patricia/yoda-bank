import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import RoutesPrivate from './routes/PrivateRoute';
import store from './store';
import Theme from './Theme';
import LocalStorageActions from './store/actions/LocalStorageActions';
import PageRegister from './pages/PageRegister';
import PageHome from './pages/PageHome';
import PageLogin from './pages/PageLogin';
import PagePasswordReset from './pages/PagePasswordReset';

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
            <Route path="/passwordreset" component={PagePasswordReset} />
            <RoutesPrivate path="/" exact component={PageHome} />
          </Switch>
        </Theme>
      </Provider>
    </BrowserRouter>
  );
};

export default App;
