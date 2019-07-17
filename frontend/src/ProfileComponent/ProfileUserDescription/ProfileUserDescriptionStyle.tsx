import { Box, Paper } from '@material-ui/core';
import styled from 'styled-components';
import { SimpleLabelText, SubText, Text } from '../../StyledComponents/StyledBasicItems';
import { MainThemeRGB } from '../../StyledComponents/Theme';

export const ProfileDescription = styled(Paper)`
    width: 280px
    padding: 1em
    text-align: center
    border-radius: 15px !important
    margin-top: 50px
`;

export const ProfilePicBox = styled(Box)`

  width: 215px
  height: 215px
  border-radius: 180px
    margin-top: -70%
    margin-left: auto
    margin-right: auto
  background-color: rgba(
    ${MainThemeRGB.primary.light.r},
    ${MainThemeRGB.primary.light.g},
    ${MainThemeRGB.primary.light.b},
    1
  );
`;
export const ProfilePic = styled(Box)`
  text-align: left
  position: relative
  top: 11px
  left: 1px
`;
export const Name = styled(SimpleLabelText)`
  font-size: 24px;
  line-height: 1;
  margin-top: 25px;
`;
export const Age = styled(SimpleLabelText)`
  font-size: 16px;
`;
export const Rating = styled(SimpleLabelText)`
  letter-spacing: 4px;
`;
export const Status = styled(SimpleLabelText)``;
export const Description = styled(Text)`
  margin-left: 15px;
  margin-right: 15px;
  margin-bottom: 20px
  text-align: justify;
`;
export const Hometown = styled(SimpleLabelText)``;

export const FavoriteFood = styled(SimpleLabelText)``;

export const IconInText = styled(SubText)``;

export const Verified = styled(SubText)`
  color: rgba(${MainThemeRGB.secondary.main.r}, ${MainThemeRGB.secondary.main.g}, ${MainThemeRGB.secondary.main.b}, 1);
`;
