import gql from 'graphql-tag';
import React, { Component } from 'react';
import { Mutation } from 'react-apollo';

import { AUTH_TOKEN } from '../constants';

const SIGN_UP_MUTATION = gql`
  mutation SignUpMutation(
    $email: String!
    $password: String!
    $phoneNumber: String!
    $firstName: String!
    $lastName: String!
    $birthday: DateTime!
    $gender: String!
    $description: String!
    $profilePicture: String!
    $homeTown: String!
    $homeCountry: String!
    $favoriteFood: String!
  ) {
    signUp(
      signUpDto: {
        email: $email
        password: $password
        phoneNumber: $phoneNumber
        firstName: $firstName
        lastName: $lastName
        birthday: $birthday
        gender: $gender
        description: $description
        profilePicture: $profilePicture
        homeTown: $homeTown
        homeCountry: $homeCountry
        favoriteFood: $favoriteFood
      }
    ) {
      token
    }
  }
`;

const LOGIN_MUTATION = gql`
  mutation LoginMutation($email: String!, $password: String!) {
    login(loginDto: { email: $email, password: $password }) {
      token
    }
  }
`;

interface Data {
  login: {
    token: string;
  };
  signUp: {
    token: string;
  };
}

class Login extends Component {
  state = {
    login: true, // switch between Login and SignUp
    email: '',
    password: '',
    firstName: '',
    lastName: '',
  };

  render() {
    const { login, email, password, firstName, lastName } = this.state;
    return (
      <div>
        <h4 className="mv3">{login ? 'Login' : 'Sign Up'}</h4>
        <div className="flex flex-column">
          {!login && (
            <div>
              <input
                value={firstName}
                onChange={(e) => this.setState({ firstName: e.target.value })}
                type="text"
                placeholder="Your first name"
              />
              <input
                value={lastName}
                onChange={(e) => this.setState({ lastName: e.target.value })}
                type="text"
                placeholder="Your last name"
              />
            </div>
          )}
          <input
            value={email}
            onChange={(e) => this.setState({ email: e.target.value })}
            type="text"
            placeholder="Your email address"
          />
          <input
            value={password}
            onChange={(e) => this.setState({ password: e.target.value })}
            type="password"
            placeholder="Choose a safe password"
          />
        </div>
        <div className="flex mt3">
          <Mutation
            mutation={login ? LOGIN_MUTATION : SIGN_UP_MUTATION}
            variables={{
              email,
              password,
              firstName,
              lastName,
              phoneNumber: '+491784680003',
              birthday: '1995-01-01',
              gender: 'm',
              description: 'Blblbl',
              profilePicture: 'String',
              homeTown: 'Cologne',
              homeCountry: 'Germany',
              favoriteFood: 'Pancakes',
            }}
            onCompleted={(data: Data) => this._confirm(data)}
          >
            {(mutation: any) => (
              <div className="pointer mr2 button" onClick={mutation}>
                {login ? 'login' : 'create account'}
              </div>
            )}
          </Mutation>
          <div className="pointer button" onClick={() => this.setState({ login: !login })}>
            {login ? 'need to create an account?' : 'already have an account?'}
          </div>
        </div>
      </div>
    );
  }

  async _confirm(data: Data) {
    const { token } = this.state.login ? data.login : data.signUp;
    this._saveUserData(token);
    console.log(token);
  }

  _saveUserData(token: string) {
    localStorage.setItem(AUTH_TOKEN, token);
  }
}

export default Login;
