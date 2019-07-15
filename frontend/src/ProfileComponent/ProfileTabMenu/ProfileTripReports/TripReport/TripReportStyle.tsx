import { Box, Card, Divider as divider } from '@material-ui/core';
import { Button } from '@material-ui/core';
import styled from 'styled-components';
import { SubText, Text } from '../../../../StyledComponents/StyledBasicItems';
import { MainThemeRGB } from '../../../../StyledComponents/Theme';

export const TripReportCard = styled(Card)`
padding: 15px
width: inherit
display: block;
position: relative;
border-radius: 15px !important
align-items: center
`;

export const TripReportPaper = styled(Box)`
padding: 1em
width: inherit
grid-column-start: 1;
grid-column-end: 7;
grid-row-start: 3
grid-row-end: 4
`;

export const ProfilePic = styled(Box)`
  text-align: left
  position: relative
  left: -8px
`;

export const ProfilePicBox = styled(Box)`
align-self: center
grid-row: 1;
grid-column: 2/7;
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

export const Divider = styled(divider)`
  grid-column-start: 1;
  grid-column-end: 8;
`;

export const Role = styled(Text)`
  grid-column: 1;
  grid-row: 1;
  align-self: center;
`;

export const Name = styled(Text)`
  line-height: 0.3;
`;

export const HomeInfo = styled(Text)`
  line-height: 0.3;
`;

export const UserInfo = styled(Text)`
grid-column: 3;
grid-row: 1;
  align-self: center
  text-align: left
`;

export const Date = styled(Text)`
  grid-column: 7;
  grid-row: 1;
  align-self: center;
`;

export const Report = styled(Text)``;

export const SeeMoreButton = styled(Button)`
  variant: "text" 
  grid-column: 4;
  grid-row: 6;
  align-self: center
`;

export const LikeCount = styled(Text)`
  grid-column: 1;
  grid-row: 6;
  align-self: center;
`;

export const IconInText = styled(SubText)`
  color: rgba(${MainThemeRGB.secondary.main.r}, ${MainThemeRGB.secondary.main.g}, ${MainThemeRGB.secondary.main.b}, 1);
`;
