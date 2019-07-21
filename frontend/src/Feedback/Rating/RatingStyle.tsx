import { Box, TextField } from '@material-ui/core';
import styled from 'styled-components';

import { SubText } from '../../StyledComponents/StyledBasicItems';
import { MainThemeRGB } from '../../StyledComponents/Theme';

export const HostContainer = styled.div`
  grid-column: 1/7;
  display: grid;
  grid-template-columns: auto auto;
  grid-column-gap: 1vw;
  grid-row-gap: 10px;
  align-items: flex-end;
`;

export const RatingContainer = styled.div`
  display: grid;
  grid-template-columns: auto auto auto auto;
  grid-column-gap: 1vw;
  grid-row-gap: 10px;
  align-items: flex-end;

  width: 70%;
`;

export const ProfilePicBox = styled(Box)`
  grid-column: 1/3;
  grid-row: 1/5

  width: 195px
  height: 195px
  border-radius: 180px
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

export const Name = styled(SubText)`
  grid-column: 1/1;
  grid-row: 6;
  margin: auto;
  font-size: 24px;
  line-height: 0.3;
`;

export const RatingStyle = styled(SubText)`
  grid-column: 4
  grid-row: 5

  letter-spacing: 4px;
`;

export const ThumbsUp = styled(SubText)`
  grid-column: 2/2;
  grid-row: 2/2;
`;

export const ThumbsDown = styled(SubText)`
  grid-column: 2/2;
  grid-row: 3/3;
`;

export const RatingTitle = styled.h3`
  grid-column: 3/7;
  grid-row: 1;
`;

export const Description = styled(TextField)`
  grid-column: 3/7;
  grid-row: 2/7;
`;

export const Hometown = styled(SubText)``;

export const FavoriteFood = styled(SubText)``;

// export const IconInText = styled(SubText)``;

export const Verified = styled(SubText)`
  color: rgba(
    ${MainThemeRGB.secondary.light.r},
    ${MainThemeRGB.secondary.light.g},
    ${MainThemeRGB.secondary.light.b},
    1
  );
`;
