import { Button, TextField } from '@material-ui/core';
import { DatePicker } from '@material-ui/pickers';
import styled from 'styled-components';
import { MainTheme, MainThemeRGB } from '../StyledComponents/Theme';

export const LoginBox = styled.div`
  max-width: 500px;
  display: grid;
  margin: auto;
  -webkit-box-shadow: 3px 5px 14px -2px rgba(${MainThemeRGB.grey.dark.r}, ${MainThemeRGB.grey.dark.g}, ${MainThemeRGB.grey.dark.b}, 1);
  -moz-box-shadow: 3px 5px 14px -2px rgba(${MainThemeRGB.grey.dark.r}, ${MainThemeRGB.grey.dark.g}, ${MainThemeRGB.grey.dark.b}, 1);
  box-shadow: 3px 5px 14px -2px rgba(${MainThemeRGB.grey.dark.r}, ${MainThemeRGB.grey.dark.g}, ${MainThemeRGB.grey.dark.b}, 1);
  border-radius: 15px;
  grid-gap: 10px;
  grid-template-columns: repeat(6, 1fr);
  grid-template-rows: auto;
  padding-bottom: 2vh;
`;

export const LoginHeader = styled.h2`
  grid-column: 2/6;
  grid-row: 1/1;
`;

export const InputEmail = styled(TextField)`
  grid-column: 2/6;
  grid-row: 2/2;
`;

export const InputPassword = styled(TextField)`
  grid-column: 2/6;
  grid-row: 3/3;
`;

export const LoginButton = styled(Button)`
  grid-column: 2/6;
  grid-row: 4/4;
`;

export const RegisterLink = styled.a`
  grid-column: 1/7;
  grid-row: 5/5;
  text-align: center;
  :hover {
    color: ${MainTheme.primary.main};
    cursor: pointer;
  }
`;

export const RegisterBox = styled.div`
  max-width: 500px;
  display: grid;
  margin: auto;
  -webkit-box-shadow: 3px 5px 14px -2px rgba(${MainThemeRGB.grey.dark.r}, ${MainThemeRGB.grey.dark.g}, ${MainThemeRGB.grey.dark.b}, 1);
  -moz-box-shadow: 3px 5px 14px -2px rgba(${MainThemeRGB.grey.dark.r}, ${MainThemeRGB.grey.dark.g}, ${MainThemeRGB.grey.dark.b}, 1);
  box-shadow: 3px 5px 14px -2px rgba(${MainThemeRGB.grey.dark.r}, ${MainThemeRGB.grey.dark.g}, ${MainThemeRGB.grey.dark.b}, 1);
  grid-gap: 10px;
  border-radius: 15px;
  grid-template-columns: repeat(6, 1fr);
  grid-template-rows: auto;
  padding-bottom: 2vh;
`;

export const GiveInformation = styled.h3`
  grid-column: 2/6;
  grid-row: 4/4;
`;

export const InputFirstName = styled(TextField)`
  grid-column: 2/6;
  grid-row: 5/5;
`;

export const InputLastName = styled(TextField)`
  grid-column: 2/6;
  grid-row: 6/6;
`;

export const InputBirthday = styled(DatePicker)`
  grid-column: 2/6;
  grid-row: 7/7;
`;

export const UploadContainer = styled.div`
  grid-column: 2/6;
  grid-row: 8/8;
`;

export const GenderLabel = styled.p`
  margin: 2px;
  color: rgba(0, 0, 0, 0.54);
  transform: translate(0, 1.5px) scale(0.75);
  float: left;
`;

export const SelectContainer = styled.div`
  grid-column: 2/6;
  grid-row: 9/9;
  padding: 6px 0 7px;
  select {
    font: inherit;
    width: 100%;
    background-color: ${MainTheme.grey.light};
    border: 1px solid ${MainTheme.grey.light};
    height: 25px;
    box-sizing: content-box;
    :hover {
      border: 1px solid ${MainTheme.primary.main};
    }
  }
`;

export const InputHometown = styled(TextField)`
  grid-column: 2/6;
  grid-row: 10/10;
`;

export const InputCountry = styled(TextField)`
  grid-column: 2/6;
  grid-row: 11/11;
`;

export const InputFavoriteFood = styled(TextField)`
  grid-column: 2/6;
  grid-row: 12/12;
`;

export const InputDescription = styled(TextField)`
  grid-column: 2/6;
  grid-row: 13/13;
`;

export const RegisterButton = styled(Button)`
  grid-column: 2/6;
  grid-row: 14/14;
`;

export const LoginLink = styled.a`
  grid-column: 1/7;
  grid-row: 15/15;
  text-align: center;
  :hover {
    color: ${MainTheme.primary.main};
    cursor: pointer;
  }
`;
