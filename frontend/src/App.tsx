import './App.css';

import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import LandingPage from './LandingPage/LandingPage';
import CreateAccommodation from './ProfileComponent/CreateAccommodation/CreateAccommodation';

export default class App extends React.Component<any, any> {
  constructor(props: any) {
    super(props);

    this.state = {
      title: 'BedForBreakfast',
      routes: [
        {
          component: CreateAccommodation,
          path: '/createAccommodation',
          exact: true,
        },
        {
          component: LandingPage,
          path: '/',
          exact: true,
        },
      ],
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
