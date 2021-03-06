import MomentUtils from '@date-io/moment';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloClient } from 'apollo-client';
import { ApolloLink, Observable } from 'apollo-link';
import { onError } from 'apollo-link-error';
import { createUploadLink } from 'apollo-upload-client';
import React from 'react';
import { ApolloProvider } from 'react-apollo';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import { Content } from './AppStyle';
import { AUTH_TOKEN } from './constants';
import { Feed } from './Feed/Feed';
import Feedback from './Feedback/Feedback';
import Login from './Login/Login';
import Footer from './NavigationElements/Footer/Footer';
import { Navbar } from './NavigationElements/Header/Header';
import AccommodationLoad from './ProfileComponent/CreateAccommodation/AccommodationLoad';
import CreateAccommodation from './ProfileComponent/CreateAccommodation/CreateAccommodation';
import ProfileComponent from './ProfileComponent/ProfileComponent';
import Requests from './Requests/Requests';
import LoadSearch from './SearchResults/LoadSearch';
import { MainThemeMaterial } from './StyledComponents/Theme';

export default class App extends React.Component<any, any> {
  constructor(props: any) {
    super(props);

    this.state = {
      title: 'BedForBreakfast',
      routes: [
        {
          component: Login,
          path: '/login',
          exact: true,
        },
        {
          component: CreateAccommodation,
          path: '/createAccommodation',
          exact: true,
        },
        {
          component: AccommodationLoad,
          path: '/accommodation/:id',
        },
        {
          component: Feedback,
          path: '/feedback/:id',
        },
        {
          component: Requests,
          path: '/requests',
        },
        {
          component: AccommodationLoad,
          path: '/loadAccommodation',
          exact: true,
        },
        {
          component: LoadSearch,
          path: '/searchResults/:city',
          exact: true,
        },
        {
          component: Feed,
          path: '/',
          exact: true,
        },
        {
          component: ProfileComponent,
          path: '/profile/:userId',
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
    const request = async (operation: any) => {
      const token = localStorage.getItem(AUTH_TOKEN);
      operation.setContext({
        headers: {
          authorization: `Bearer ${token}`,
        },
      });
    };

    const requestLink = new ApolloLink(
      (operation, forward) =>
        new Observable((observer) => {
          let handle: any;
          if (forward) {
            Promise.resolve(operation)
              .then((oper) => request(oper))
              .then(() => {
                handle = forward(operation).subscribe({
                  next: observer.next.bind(observer),
                  error: observer.error.bind(observer),
                  complete: observer.complete.bind(observer),
                });
              })
              .catch(observer.error.bind(observer));
          }
          return () => {
            if (handle) {
              handle.unsubscribe();
            }
          };
        }),
    );

    return (
      <ApolloProvider
        client={
          new ApolloClient({
            link: ApolloLink.from([
              onError(({ graphQLErrors, networkError }) => {
                if (graphQLErrors) {
                  graphQLErrors.forEach(({ message, locations, path }) => {
                    console.log(
                      `[GraphQL error]: Message: ${JSON.stringify(message)}, Location: ${JSON.stringify(
                        locations,
                      )}, Path: ${path}`,
                    );
                  });
                }
                if (networkError) {
                  console.log(`[Network error]: ${networkError}`);
                }
              }),
              requestLink,
              createUploadLink({ uri: 'http://localhost:3001/graphql' }),
            ]),
            cache: new InMemoryCache(),
          })
        }
      >
        <MuiPickersUtilsProvider utils={MomentUtils}>
          <MuiThemeProvider theme={MainThemeMaterial}>
            <Router>
              <Navbar />
              <Content>
                <Switch>
                  {this.state.routes.map((route: any, i: any) => (
                    <Route key={i} {...route} />
                  ))}
                </Switch>
              </Content>
              <Footer />
            </Router>
          </MuiThemeProvider>
        </MuiPickersUtilsProvider>
      </ApolloProvider>
    );
  }
}
