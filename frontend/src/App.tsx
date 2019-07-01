import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import ApolloClient from 'apollo-boost';
import React from 'react';
import { ApolloProvider } from 'react-apollo';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import styled from 'styled-components';

import LandingPage from './LandingPage/LandingPage';
import Footer from './NavigationElements/Footer/Footer';
import Navbar from './NavigationElements/Header/Header';
import CreateAccommodation from './ProfileComponent/CreateAccommodation/CreateAccommodation';
import { MainThemeMaterial } from './StyledComponents/Theme';

export default class App extends React.Component<any, any> {
  Content = styled.div`
    min-height: 95vh;
  `;

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

    this.componentDidMount();
  }

  componentDidMount() {
    document.title = this.state.title;
  }

  render() {
    return (
      <ApolloProvider client={new ApolloClient({ uri: 'http://localhost:3001/graphql' })}>
        <div>
          <MuiThemeProvider theme={MainThemeMaterial}>
            <Router>
              <Navbar />
              <this.Content>
                <Switch>
                  {this.state.routes.map((route: any, i: any) => (
                    <Route key={i} {...route} />
                  ))}
                </Switch>
              </this.Content>
              <Footer />
            </Router>
          </MuiThemeProvider>
        </div>
      </ApolloProvider>
    );
  }
}
