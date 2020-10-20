import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Theme from "./Theme";
import PageRegister from "./pages/PageRegister";
import PageDeposit from "./pages/PageDeposit";

const App = () => (
  <BrowserRouter>
    <Theme>
      <Switch>
        <Route path="/register" component={PageRegister} />                
        <Route path="/deposit" component={PageDeposit} />                
      </Switch>    
    </Theme>  
  </BrowserRouter>
);

export default App;
