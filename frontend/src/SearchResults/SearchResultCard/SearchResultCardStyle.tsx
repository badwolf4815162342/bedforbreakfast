import { Box } from '@material-ui/core';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { SimpleLabelText, SubText } from './../../StyledComponents/StyledBasicItems';
import { MainTheme, MainThemeRGB } from './../../StyledComponents/Theme';

export const CardResult = styled.div`
  margin-right: 2px;
  margin-left: 2px;
  -webkit-box-shadow: 3px 5px 14px -2px rgba(${MainThemeRGB.grey.dark.r}, ${MainThemeRGB.grey.dark.g}, ${MainThemeRGB.grey.dark.b}, 1);
  -moz-box-shadow: 3px 5px 14px -2px rgba(${MainThemeRGB.grey.dark.r}, ${MainThemeRGB.grey.dark.g}, ${MainThemeRGB.grey.dark.b}, 1);
  box-shadow: 3px 5px 14px -2px rgba(${MainThemeRGB.grey.dark.r}, ${MainThemeRGB.grey.dark.g}, ${MainThemeRGB.grey.dark.b}, 1);
  height: 244px;
  display: grid;
  grid-gap: 10px;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: auto;
  border-radius: 15px;
`;

export const AccommodationImageContainer = styled.div`
  grid-column-start: 1;
  grid-column-end: 1;
  grid-row-start: 1;
  grid-row-end: 4;
  max-height: 244px;
`;

export const AccommodationImage = styled.img`
  width: 100%;
  height: 244px;
  object-fit: cover;
  border-radius: 15px;
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
  height: 12vh;
  overflow: scroll;
  hyphens: auto;
  text-align: justify;
`;

export const AccommodationTreats = styled.div`
  grid-column-start: 1;
  grid-column-end: 2;
  grid-row-start: 3;
  grid-row-end: 4;
  font-weight: bold;
  p {
    margin: 0;
  }
`;

export const BoxSeparatorRight = styled.div`
  grid-row-start: 1;
  grid-row-end: 4;
  border-right: 1px solid ${MainTheme.grey.main};
  max-height: 244px;
`;

export const BorderNoSeparator = styled.div`
  grid-row-start: 1;
  grid-row-end: 4;
  max-height: 244px;
`;

export const HostName = styled.h3`
  grid-column-start: 4;
  grid-column-end: 4;
  grid-row-start: 1;
  grid-row-end: 1;
`;

export const HostDescription = styled.p`
  grid-column-start: 4;
  grid-column-end: 4;
  grid-row-start: 2;
  grid-row-end: 4;
  height: 12vh;
  overflow: scroll;
  hyphens: auto;
  text-align: justify;
`;

export const HostTreats = styled.div`
  grid-column-start: 4;
  grid-column-end: 4;
  grid-row-start: 3;
  grid-row-end: 4;
  font-weight: bold;
  p {
    margin: 0;
  }
`;

export const HostImageContainer = styled.div`
  grid-column-start: 3;
  grid-column-end: 3;
  grid-row-start: 1;
  grid-row-end: 4;
`;

export const HostImageBox = styled(Box)`
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
export const HostImage = styled(Box)`
  text-align: left;
  position: relative;
  top: 11px;
  left: 1px;
`;

export const IconInText = styled(SubText)``;

export const RatingContainer = styled(SimpleLabelText)`
  margin-top: 5px;
  letter-spacing: 4px;
`;

export const Rating = styled.div`
  margin: auto;
  width: fit-content;
`;

export const LinkCard = styled(Link)`
  color: inherit;
  text-decoration: none;
`;
