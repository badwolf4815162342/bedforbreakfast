import { Box } from '@material-ui/core';
import styled from 'styled-components';
import { MainTheme, MainThemeRGB } from './../../StyledComponents/Theme';

export const CardAccommodation = styled.div`
  box-shadow: 2px 2px 2px 1px rgba(0, 0, 0, 0.2);
  grid-column: 1/13;
  display: grid;
  grid-gap: 10px;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: 5vh 15vh 10vh;
`;

export const ImageContainerAccommodation = styled.div`
  grid-column-start: 1;
  grid-column-end: 1;
  grid-row-start: 1;
  grid-row-end: 4;
`;

export const ImageAccommodation = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

export const AccommodationTitle = styled.h3`
  grid-column-start: 1;
  grid-column-end: 2;
  grid-row-start: 1;
  grid-row-end: 1;
`;

export const AccommodationDescription = styled.p`
  grid-column-start: 1;
  grid-column-end: 2;
  grid-row-start: 2;
  grid-row-end: 4;
  max-height: 12vh;
  overflow: scroll;
`;

export const AccommodationNumberOfBeds = styled.div`
  grid-column-start: 1;
  grid-column-end: 2;
  grid-row-start: 3;
  grid-row-end: 4;
  font-weight: bold;
`;

export const BorderBox = styled.div`
  grid-row-start: 1;
  grid-row-end: 4;
  border-right: 1px solid ${MainTheme.grey.main};
`;

export const UserName = styled.h3`
  grid-column-start: 4;
  grid-column-end: 4;
  grid-row-start: 1;
  grid-row-end: 1;
`;

export const UserDescription = styled.p`
  grid-column-start: 4;
  grid-column-end: 4;
  grid-row-start: 2;
  grid-row-end: 4;
  max-height: 12vh;
  overflow: scroll;
`;

export const FavoriteFood = styled.div`
  grid-column-start: 4;
  grid-column-end: 4;
  grid-row-start: 3;
  grid-row-end: 4;
  font-weight: bold;
`;

export const ImageContainerHost = styled.div`
  grid-column-start: 3;
  grid-column-end: 3;
  grid-row-start: 1;
  grid-row-end: 4;
`;

export const ProfilePicBox = styled(Box)`
  width: 195px;
  height: 195px;
  border-radius: 180px;
  margin-left: auto;
  margin-right: auto;
  background-color: rgba(
    ${MainThemeRGB.primary.light.r},
    ${MainThemeRGB.primary.light.g},
    ${MainThemeRGB.primary.light.b},
    1
  );
  align-items: left;
  text-align: left;
`;
export const ProfilePic = styled(Box)`
  text-align: left;
  position: relative;
  top: 11px;
  left: 1px;
`;
