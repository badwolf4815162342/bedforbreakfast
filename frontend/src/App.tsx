import React from 'react';
import './App.css';
import CreateAccommodation from './ProfileComponent/CreateAccommodation/CreateAccommodation';
import LandingPage from './LandingPage/LandingPage';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import PrimarySearchAppBar from './NavigationElements/Header/Header';
import { createMuiTheme } from '@material-ui/core/styles';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#fdd835',
    },
    secondary: {
      main: '#3f51b5',
    },
  },
});

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
  styles = {
    margin: '1%',
    width: '98%',
    height: '30px',
    backgroundColor: 'yellow',
  };

  componentDidMount() {
    document.title = this.state.title;
  }

  render() {
    return (
      <div>
        <MuiThemeProvider theme={theme}>
          <PrimarySearchAppBar />
          <Router>
            <Switch>
              {this.state.routes.map((route: any, i: any) => (
                <Route key={i} {...route} />
              ))}
            </Switch>
          </Router>
          <footer style={this.styles}>Global footer</footer>
        </MuiThemeProvider>
      </div>
    );
  }
}
