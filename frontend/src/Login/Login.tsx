import { Button } from '@material-ui/core';
import gql from 'graphql-tag';
import React, { Component } from 'react';
import { Mutation } from 'react-apollo';

import { AUTH_TOKEN, USER_ID } from '../constants';
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
  UploadContainer,
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
  profilePicture: File | undefined;
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
      profilePicture: undefined,
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
      profilePicture,
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
              onChange={(date) => {
                if (date) {
                  this.setState({ birthday: date.toDate() });
                }
              }}
              format="DD.MM.YYYY"
              disableFuture
              label="Your date of birth"
            />
            <UploadContainer>
              <input
                accept="image/*"
                style={{ display: 'none' }}
                id="raised-button-file"
                multiple
                type="file"
                onChange={(e) => {
                  if (e.target.files) {
                    const file = e.target.files[0];
                    console.log(file);
                    this.setState({ profilePicture: file });
                  }
                }}
              />
              <label htmlFor="raised-button-file">
                <Button variant="contained" component="span">
                  Upload Profile Picture
                </Button>
              </label>
            </UploadContainer>
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
                birthday,
                gender,
                description,
                profilePicture,
                homeTown,
                homeCountry,
                favoriteFood,
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
    const { token, user } = this.state.login ? data.login : data.signUp;
    this._saveUserData(token, user._id);
  }

  _saveUserData(token: string, userId: string) {
    localStorage.setItem(AUTH_TOKEN, token);
    localStorage.setItem(USER_ID, userId);
  }
}

export default Login;
