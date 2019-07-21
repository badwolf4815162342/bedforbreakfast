import { Box, Card } from '@material-ui/core';
import styled from 'styled-components';
import { SimpleLabelText, SubText, Text } from '../../../StyledComponents/StyledBasicItems';
import { MainThemeRGB } from '../../../StyledComponents/Theme';

export const AccommodationInProfileCard = styled(Card)`
  margin-top: 50px
  margin-bottom: 0px
  padding: 25px
  width: inherit
  position: relative;
  border-radius: 15px !important
  align-items: center
`;

export const DescriptionPaper = styled(Box)`
  padding: 15px
  display: flex
  margin-top: 15px
  margin-bottom: 15px
`;

export const Description = styled(Text)`
  hyphens: auto;
`;

export const Location = styled(SimpleLabelText)``;
export const InfoLabel = styled(SimpleLabelText)`
  margin-top: 20px;
`;
export const IconInText = styled(SubText)`
  margin-right: 20px
  margin-left: 0px
  align-self: start;
  justify-self: start;
  color: rgba(${MainThemeRGB.secondary.main.r}, ${MainThemeRGB.secondary.main.g}, ${MainThemeRGB.secondary.main.b}, 1);
`;

export const NoAccommodationLabel = styled(SimpleLabelText)`
  text-align: center;
`;

export const ImagesCarousel = styled.div`
  .image-gallery-slide-wrapper {
    display: none;
  }
  .image-gallery-thumbnails {
    overflow: scroll;
  }
`;
