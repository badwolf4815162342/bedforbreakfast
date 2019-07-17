import gql from 'graphql-tag';
import React, { Component } from 'react';
import { Mutation } from 'react-apollo';

import { AUTH_TOKEN } from '../constants';
import { Section } from '../StyledComponents/StyledBasicItems';
import {
  GenderLabel,
  GiveInformation,
  InputBirthday,
  InputCountry,
  InputDescription,
  InputEmail,
  InputFavoriteFood,
  InputFirstName,
  InputHometown,
  InputLastName,
  InputPassword,
  LoginBox,
  LoginButton,
  LoginHeader,
  LoginLink,
  RegisterBox,
  RegisterButton,
  RegisterLink,
  SelectContainer,
} from './LoginStyle';

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

interface LoginState {
  login: boolean;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  birthday: Date;
  gender: string;
  description: string;
  homeTown: string;
  homeCountry: string;
  favoriteFood: string;
}

class Login extends Component<{}, LoginState> {
  constructor(props: any) {
    super(props);
    this.state = {
      login: true, // switch between Login and SignUp
      email: '',
      password: '',
      firstName: '',
      lastName: '',
      birthday: new Date(),
      gender: '',
      description: '',
      homeTown: '',
      homeCountry: '',
      favoriteFood: '',
    };
  }

  render() {
    const {
      login,
      email,
      password,
      firstName,
      lastName,
      birthday,
      gender,
      description,
      homeTown,
      homeCountry,
      favoriteFood,
    } = this.state;
    return (
      <Section>
        {login && (
          <LoginBox>
            <LoginHeader>Login</LoginHeader>
            <InputEmail
              value={email}
              onChange={(e) => this.setState({ email: e.target.value })}
              type="email"
              label="Your email address"
            />
            <InputPassword
              value={password}
              onChange={(e) => this.setState({ password: e.target.value })}
              type="password"
              label="Choose a safe password"
            />
            <Mutation
              mutation={LOGIN_MUTATION}
              variables={{
                email,
                password,
              }}
              onCompleted={(data: Data) => this._confirm(data)}
            >
              {(mutation: any) => (
                <LoginButton variant="contained" color="secondary" type="submit" onClick={mutation}>
                  Login
                </LoginButton>
              )}
            </Mutation>
            <RegisterLink onClick={() => this.setState({ login: !login })}>Need to create an account?</RegisterLink>
          </LoginBox>
        )}
        {!login && (
          <RegisterBox>
            <LoginHeader>Sign up</LoginHeader>
            <InputEmail
              value={email}
              onChange={(e) => this.setState({ email: e.target.value })}
              type="email"
              label="Your email address"
            />
            <InputPassword
              value={password}
              onChange={(e) => this.setState({ password: e.target.value })}
              type="password"
              label="Choose a safe password"
            />
            <GiveInformation>Additional Information</GiveInformation>
            <InputFirstName
              value={firstName}
              onChange={(e) => this.setState({ firstName: e.target.value })}
              type="text"
              label="Your first name"
            />
            <InputLastName
              value={lastName}
              onChange={(e) => this.setState({ lastName: e.target.value })}
              type="text"
              label="Your last name"
            />
            <InputBirthday
              value={birthday}
              onChange={(e) => {
                console.log(e.target.value);
                this.setState({ birthday: new Date(e.target.value) });
              }}
              type="date"
              label="Your date of birth"
            />
            <SelectContainer>
              <GenderLabel>Gender:</GenderLabel>
              <select value={gender} onChange={(e) => this.setState({ gender: e.target.value })}>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </SelectContainer>
            <InputDescription
              value={description}
              onChange={(e) => this.setState({ description: e.target.value })}
              type="text"
              label="Describe yourself"
            />
            <InputHometown
              value={homeTown}
              onChange={(e) => this.setState({ homeTown: e.target.value })}
              type="text"
              label="Your hometown"
            />
            <InputCountry
              value={homeCountry}
              onChange={(e) => this.setState({ homeCountry: e.target.value })}
              type="text"
              label="Your home country"
            />
            <InputFavoriteFood
              value={favoriteFood}
              onChange={(e) => this.setState({ favoriteFood: e.target.value })}
              type="text"
              label="Your favorite food"
            />
            <Mutation
              mutation={SIGN_UP_MUTATION}
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
                <RegisterButton variant="contained" color="secondary" type="submit" onClick={mutation}>
                  Create Account
                </RegisterButton>
              )}
            </Mutation>
            <LoginLink onClick={() => this.setState({ login: !login })}>Already have an account?</LoginLink>
          </RegisterBox>
        )}
      </Section>
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
