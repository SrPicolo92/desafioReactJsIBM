import { Component } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import PageHolder from "./components/PageHolder/PageHolder";
import AppRoutes from "./routes";

class App extends Component {
  
  render() {
    return (
      <Router>
        <Switch>
          {AppRoutes.map((route, key) => {
            const { component, path } = route;
            const Component = component;

            return (
              <Route exact={true} path={path} key={key} render={Component} />
            );
          })}
        </Switch>
        <PageHolder />
      </Router>
    );
  }
}

export default App;
