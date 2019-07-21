import { Box, Divider } from '@material-ui/core';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { MainTheme, MainThemeRGB } from '../../StyledComponents/Theme';
import { SubText, Text } from './../../../src/StyledComponents/StyledBasicItems';

export const FeedCard = styled.div`
  grid-column: 1/7;
  -webkit-box-shadow: 3px 5px 14px -2px rgba(${MainThemeRGB.grey.dark.r}, ${MainThemeRGB.grey.dark.g}, ${MainThemeRGB.grey.dark.b}, 1);
  -moz-box-shadow: 3px 5px 14px -2px rgba(${MainThemeRGB.grey.dark.r}, ${MainThemeRGB.grey.dark.g}, ${MainThemeRGB.grey.dark.b}, 1);
  box-shadow: 3px 5px 14px -2px rgba(${MainThemeRGB.grey.dark.r}, ${MainThemeRGB.grey.dark.g}, ${MainThemeRGB.grey.dark.b}, 1);
  border-radius: 15px;
  padding: 20px;
  display: grid;
  grid-gap: 10px;
  grid-template-columns: repeat(12, 1fr);
`;

export const FeedCardHeader = styled.div`
  grid-column: 1/13;
  border-bottom: 1px solid ${MainTheme.grey.main};
`;

export const AuthorPic = styled(Box)`
  text-align: left
  position: relative
  left: -8px
`;

export const AuthorPicBox = styled(Box)`
  grid-row: 1/1;
  grid-column: 1/2;
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

export const ReceiverPic = styled(Box)`
  text-align: left
  position: relative
  left: -8px
`;

export const ReceiverPicBox = styled(Box)`
  grid-row: 1/1;
  grid-column: 6/7;
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

export const DividerStyled = styled(Divider)`
  grid-column: 1/13
  align-self: baseline;
`;

export const Role = styled(Text)`
  grid-row: 1/1;
  grid-column: 5/6;
  align-self: center;
  justify-self: start;
`;

export const Name = styled(Text)`
  line-height: 0.3;
  margin-bottom: 15px;
`;

export const HomeInfo = styled(Text)`
  line-height: 0.3;
`;

export const ReceiverInfo = styled(Text)`
  grid-row: 1/1;
  grid-column: 7/11;
  align-self: center
  margin-bottom: 0px
  margin-bottom: 0px
`;

export const AuthorInfo = styled(Text)`
  grid-row: 1/1;
  grid-column: 2/5;
  align-self: center
  margin-bottom: 0px
  margin-bottom: 0px
`;

export const Date = styled(Text)`
  grid-column: 11/13;
  grid-row: 1;
  align-self: center;
  justify-self: center;
`;

export const IconInText = styled(SubText)`
  grid-column: 1/2;
  grid-row: 6/6;
  align-self: center;
  color: rgba(${MainThemeRGB.secondary.main.r}, ${MainThemeRGB.secondary.main.g}, ${MainThemeRGB.secondary.main.b}, 1);
`;

export const HeaderLink = styled(Link)`
  color: inherit;
  text-decoration: none;
`;

export const DescriptionArea = styled.div`
  grid-column: 1/13;
  grid-row: 4/4;
  hyphens: auto;
  text-align: justify;
`;

export const ImagesCarousel = styled.div`
  .image-gallery-slide-wrapper {
    display: none;
  }
  .image-gallery-thumbnails {
    overflow: scroll;
  }
  grid-column: 1/13;
  grid-row: 3/3;
`;

export const LikeCounter = styled.p`
  grid-column: 2/3;
  margin-left: -40px;
  grid-row: 6/6;
`;
