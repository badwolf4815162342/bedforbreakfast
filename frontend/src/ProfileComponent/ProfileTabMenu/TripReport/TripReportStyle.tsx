import { Box, Card, Divider as divider } from '@material-ui/core';
import { Button } from '@material-ui/core';
import styled from 'styled-components';
import { SimpleLabelText, SubText, Text } from '../../../StyledComponents/StyledBasicItems';
import { MainThemeRGB } from '../../../StyledComponents/Theme';

export const TripReportCard = styled(Card)`
  margin-top: 20px
  margin-bottom: 0px
  padding: 15px
  width: inherit
  position: relative;
  border-radius: 15px !important
  align-items: center
`;

export const TripReportPaper = styled(Box)`
  padding: 25px
  width: inherit
  grid-column-start: 1;
  grid-column-end: column2-end;
  grid-row: 1;
`;

export const ProfilePic = styled(Box)`
  text-align: left
  position: relative
  left: -8px
`;

export const ProfilePicBox = styled(Box)`
  justify-self: end;
  align-self: center
  grid-row: 1;
  grid-column: 2;
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
  grid-column-end: column2-end;
  grid-row: 2;
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

export const Date = styled(Text)`
  grid-column: 4;
  grid-row: 1;
  align-self: center;
  justify-self: center;
`;

export const Report = styled(Text)``;

export const SeeMoreButton = styled(Button)`
  variant: "text" 
  grid-column: 1;
  grid-column: 2;
  align-self: center
  justify-self: start;
`;

export const LikeCount = styled(Text)`
  grid-column: 1;
  grid-column: 1;
  align-self: center;
  justify-self: start;
  margin-bottom: 0px
  margin-left: 25px;
  font-size: 14pt;
  
`;

export const IconInText = styled(SubText)`
  align-self: center;
  color: rgba(${MainThemeRGB.secondary.main.r}, ${MainThemeRGB.secondary.main.g}, ${MainThemeRGB.secondary.main.b}, 1);
`;

export const NoReportsLabel = styled(SimpleLabelText)`
  text-align: center;
`;

export const ImagesCarousel = styled.div`
  margin-top: 15px;
  .image-gallery-slide-wrapper {
    display: none;
  }
  .image-gallery-thumbnails {
    overflow: scroll;
  }
`;
