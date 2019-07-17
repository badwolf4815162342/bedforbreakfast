import { Box, Divider as divider } from '@material-ui/core';
import styled from 'styled-components';
import { SubText, Text } from '../../../StyledComponents/StyledBasicItems';
import { MainThemeRGB } from '../../../StyledComponents/Theme';

export const ProfilePic = styled(Box)`
  text-align: left
  position: relative
  left: -8px
`;

export const ProfilePicBox = styled(Box)`
  grid-row: 1;
  grid-column: 2;
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

export const AuthorPicBox = styled(ProfilePicBox)`
  grid-row: 1;
  grid-column: 2;
`;

export const ReferencePicBox = styled(ProfilePicBox)`
  grid-row: 1;
  grid-column: 5;
`;

export const Divider = styled(divider)`
  grid-column-start: 1;
  grid-column-end: column4-end;
  align-self: baseline;
`;

export const Role = styled(Text)`
  grid-column: 1;
  grid-row: 1;
  align-self: center;
  justify-self: center;
`;

export const Name = styled(Text)`
  line-height: 0.3;
  margin-bottom: 15px;
`;

export const HomeInfo = styled(Text)`
  line-height: 0.3;
`;

export const UserInfo = styled(Text)`
  grid-column: 3;
  grid-row: 1;
  align-self: center
  margin-bottom: 0px
  margin-bottom: 0px
`;

export const AuthorInfo = styled(UserInfo)`
  grid-column: 3;
  grid-row: 1;
`;

export const ReferenceInfo = styled(UserInfo)`
  grid-column: 6;
  grid-row: 1;
`;

export const Date = styled(Text)`
  grid-column: 4;
  grid-row: 1;
  align-self: center;
  justify-self: center;
`;

export const IconInText = styled(SubText)`
  grid-column: 2;
  grid-row: 1;
  align-self: center;
  color: rgba(${MainThemeRGB.secondary.main.r}, ${MainThemeRGB.secondary.main.g}, ${MainThemeRGB.secondary.main.b}, 1);
`;
