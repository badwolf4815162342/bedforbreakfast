import { Box } from '@material-ui/core';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { MainThemeRGB } from './../../StyledComponents/Theme';

export const RequestCard = styled.div`
  -webkit-box-shadow: 3px 5px 14px -2px rgba(${MainThemeRGB.grey.dark.r}, ${MainThemeRGB.grey.dark.g}, ${MainThemeRGB.grey.dark.b}, 1);
  -moz-box-shadow: 3px 5px 14px -2px rgba(${MainThemeRGB.grey.dark.r}, ${MainThemeRGB.grey.dark.g}, ${MainThemeRGB.grey.dark.b}, 1);
  box-shadow: 3px 5px 14px -2px rgba(${MainThemeRGB.grey.dark.r}, ${MainThemeRGB.grey.dark.g}, ${MainThemeRGB.grey.dark.b}, 1);
  grid-column: 1/7;
  display: grid;
  grid-gap: 10px;
  grid-template-columns: repeat(6, 1fr);
  padding: 20px;
  border-radius: 15px;
`;

export const RequestContainer = styled.h3`
  grid-column: 1/6;
  grid-row: 1/1;
`;

export const ButtonContainer = styled.div`
  grid-column: 7/7;
  grid-row: 1/1;
`;

export const DescriptionContainer = styled.div`
  grid-column: 1/7;
  grid-row: 2/2;
`;

export const ContactContainer = styled.div`
  grid-column: 1/7;
  grid-row: 3/3;
`;

export const AuthorPic = styled(Box)`
  text-align: left
  position: relative
  left: -8px
`;

export const HeaderLink = styled(Link)`
  color: inherit;
  text-decoration: none;
`;

export const AuthorPicBox = styled(Box)`
  grid-row: 1/1;
  grid-column: 6/6;
  justify-self: end;
  align-self: center
  width: 65px
  height: 65px
  border-radius: 180px
  background-color: rgba(
    ${MainThemeRGB.secondary.light.r},
    ${MainThemeRGB.secondary.light.g},
    ${MainThemeRGB.secondary.light.b},
    1
  );
`;
