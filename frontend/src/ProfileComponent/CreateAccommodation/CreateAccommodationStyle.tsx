import { Switch, TextField } from '@material-ui/core';
import styled from 'styled-components';
import {
  GridContainer,
  StyledSubtitle,
  StyledTitle,
} from '../../StyledComponents/StyledBasicItems';

export const AccommodationGrid = styled(GridContainer)`
  grid-template-areas:
    'title title title title title title'
    'enableText enableText enableText enableText enableSelector enableSelector'
    'subTitle subTitle subTitle subTitle subTitle subTitle'
    'streetName streetName streetName streetName streetNumber streetNumber';
`;

export const AccommodationTitle = styled(StyledTitle)`
  grid-area: title;
`;

export const EnableText = styled.p`
  grid-area: enableText;
`;

export const EnableSelector = styled(Switch)`
  grid-area: enableSelector;
  justify-self: end;
`;

export const Subtitle = styled(StyledSubtitle)`
  grid-area: subTitle;
`;

export const StreetName = styled(TextField)`
  grid-area: streetName;
`;

export const StreetNumber = styled(TextField)`
  grid-area: streetNumber;
`;
