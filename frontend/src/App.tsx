import './App.css';

import { createMuiTheme } from '@material-ui/core/styles';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import LandingPage from './LandingPage/LandingPage';
import Footer from './NavigationElements/Footer/Footer';
import Navbar from './NavigationElements/Header/Header';
import CreateAccommodation from './ProfileComponent/CreateAccommodation/CreateAccommodation';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#fdd835',
    },
    secondary: {
      main: '#7986cb',
    },
  },
});

export default class App extends React.Component<any, any> {
  styleContent = {
    color: 'red',
    minHeight: '95vh',
  };

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
        <MuiThemeProvider theme={theme}>
          <Router>
            <Navbar />
            <div style={this.styleContent}>
              <Switch>
                {this.state.routes.map((route: any, i: any) => (
                  <Route key={i} {...route} />
                ))}
              </Switch>
            </div>
            <Footer />
          </Router>
        </MuiThemeProvider>
      </div>
    );
  }
}
