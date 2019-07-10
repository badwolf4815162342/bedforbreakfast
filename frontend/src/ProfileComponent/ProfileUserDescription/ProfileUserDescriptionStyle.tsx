import { Box, Paper } from '@material-ui/core';
import styled from 'styled-components';
import {
  SubText,
  SubtitleSubtext,
  Text,
} from '../../StyledComponents/StyledBasicItems';
import { MainThemeRGB } from '../../StyledComponents/Theme';

export const ProfileDescription = styled(Paper)`
    width: 256px
    margin-top: 10em
    margin-left: 1em
    margin-right: 3em
    padding: 1em
    text-align: center
`;

export const ProfilePicBox = styled(Box)`

  width: 195px
  height: 195px
  border-radius: 180px
    margin-top: -50%
    margin-left: auto
    margin-right: auto
  background-color: rgba(
    ${MainThemeRGB.primary.light.r},
    ${MainThemeRGB.primary.light.g},
    ${MainThemeRGB.primary.light.b},
    1
  );
  align-items: left
  text-align: left

`;
export const ProfilePic = styled(Box)`

  text-align: left
  position: relative
  top: 11px
  left: 1px

`;
export const Name = styled(SubtitleSubtext)`
  font-size: 24px;
  line-height: 0.3;
`;
export const Age = styled(SubtitleSubtext)`
  line-height: 0.3;
  font-size: 16px;
`;
export const Rating = styled(SubtitleSubtext)`
  letter-spacing: 4px;
`;
export const Status = styled(SubtitleSubtext)``;
export const Description = styled(Text)`
  margin-left: 1em;
  margin-right: 1em;
  text-align: justify;
`;
export const Hometown = styled(SubtitleSubtext)``;
export const FavoriteFood = styled(SubtitleSubtext)``;
export const IconInText = styled(SubText)``;

export const Verified = styled(SubText)`
  color: rgba(
    ${MainThemeRGB.secondary.light.r},
    ${MainThemeRGB.secondary.light.g},
    ${MainThemeRGB.secondary.light.b},
    1
  );
`;
