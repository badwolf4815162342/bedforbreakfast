import React from "react";
import logo from "./logo.svg";
import "./App.css";
import CreateAccommodation from "./ProfileComponent/CreateAccommodation/CreateAccommodation";
import LandingPage from "./LandingPage/LandingPage";
import {
  HashRouter as Router,
  Route,
  Switch,
  Redirect
} from "react-router-dom";

export default class App extends React.Component<any, any> {
  constructor(props: any) {
    super(props);

    this.state = {
      title: "BedForBreakfast",
      routes: [
        {
          component: CreateAccommodation,
          path: "/createAccommodation",
          exact: true
        },
        {
          component: LandingPage,
          path: "/",
          exact: true
        }
      ]
    };
  }

  componentDidMount() {
    document.title = this.state.title;
  }

  render() {
    return (
      <div>
        <Router>
          <Switch>
            {this.state.routes.map((route: any, i: any) => (
              <Route key={i} {...route} />
            ))}
          </Switch>
        </Router>
      </div>
    );
  }
}
/* routes: [{ Component: CreateAccommodation, path: "/createAccommodation" }] */
