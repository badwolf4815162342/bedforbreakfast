import { Box, Card, Divider as divider } from '@material-ui/core';
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

export const Divider = styled(divider)`
  grid-column-start: 1;
  grid-column-end: column2-end;
  grid-row: 2;
  align-self: baseline;
`;

export const Report = styled(Text)``;

export const LikeCount = styled(Text)`
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
