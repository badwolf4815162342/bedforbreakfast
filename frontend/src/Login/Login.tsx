import gql from 'graphql-tag';
import React, { Component } from 'react';
import { Mutation } from 'react-apollo';

import { AUTH_TOKEN, USER_ID } from '../constants';

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
    $profilePicture: Upload!
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
      user {
        _id
      }
      token
    }
  }
`;

const LOGIN_MUTATION = gql`
  mutation LoginMutation($email: String!, $password: String!) {
    login(loginDto: { email: $email, password: $password }) {
      user {
        _id
      }
      token
    }
  }
`;

const ADD_PIC_MUTATION = gql`
  mutation AddProfilePicture($picture: Upload!) {
    addProfilePicture(picture: $picture)
  }
`;

interface Data {
  login: {
    user: {
      _id: string;
    };
    token: string;
  };
  signUp: {
    user: {
      _id: string;
    };
    token: string;
  };
}

class Login extends Component<
  {},
  {
    login: boolean;
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    profilePicture: File | undefined;
  }
> {
  constructor(props: any) {
    super(props);
    this.state = {
      login: true, // switch between Login and SignUp
      email: '',
      password: '',
      firstName: '',
      lastName: '',
      profilePicture: undefined,
    };
  }

  render() {
    const { login, email, password, firstName, lastName, profilePicture } = this.state;
    console.log(profilePicture);

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
              <input
                onChange={(e) => {
                  console.log(e.target.files);
                  if (e.target.files) {
                    const file = e.target.files[0];
                    this.setState({ ...this.state, profilePicture: file });
                    console.log(e.target.files[0]);
                    console.log(this.state);
                  }
                }}
                type="file"
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
          {/* <Mutation
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
              profilePicture,
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
          </Mutation> */}
          <Mutation
            mutation={ADD_PIC_MUTATION}
            variables={{
              picture: this.state.profilePicture,
            }}
            onCompleted={(data: Data) => console.log(data)}
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
    const { token, user } = this.state.login ? data.login : data.signUp;
    this._saveUserData(token, user._id);
    console.log(token);
  }

  _saveUserData(token: string, userId: string) {
    localStorage.setItem(AUTH_TOKEN, token);
    localStorage.setItem(USER_ID, userId);
  }
}

export default Login;
