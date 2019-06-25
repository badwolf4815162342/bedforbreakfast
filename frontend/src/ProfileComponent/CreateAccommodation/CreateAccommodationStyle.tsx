import { Divider as divider, Switch, TextField } from '@material-ui/core';
import styled from 'styled-components';
import {
  GridContainer,
  Subtitle as subTitle,
  Title,
} from '../../StyledComponents/StyledBasicItems';

export const AccommodationGrid = styled(GridContainer)`
  grid-template-areas:
    'title title title title title title'
    'divider divider divider divider divider divider'
    'enableText enableText enableText enableText enableSelector enableSelector'
    'nrBedsText nrBedsText nrBedsText nrBedsText nrBedsSelector nrBedsSelector'
    'subTitle subTitle subTitle subTitle subTitle subTitle'
    'streetName streetName streetName streetName streetNumber streetNumber'
    'zipCode zipCode cityName cityName cityName cityName';
`;

export const AccommodationTitle = styled(Title)`
  grid-area: title;
`;

export const EnableText = styled.p`
  grid-area: enableText;
`;

export const EnableSelector = styled(Switch)`
  grid-area: enableSelector;
  justify-self: end;
`;

export const Subtitle = styled(subTitle)`
  grid-area: subTitle;
`;

export const StreetName = styled(TextField)`
  grid-area: streetName;
`;

export const StreetNumber = styled(TextField)`
  grid-area: streetNumber;
`;

export const ZipCode = styled(TextField)`
  grid-area: zipCode;
`;

export const CityName = styled(TextField)`
  grid-area: cityName;
`;

export const Divider = styled(divider)`
  grid-area: divider;
`;

export const NrBedsText = styled.p`
  grid-area: nrBedsText;
`;

export const NrBedsSelector = styled(TextField)`
  grid-area: nrBedsSelector;
  justify-self: end;
`;

export const NrBedsIcon = styled.svg`
  grid-area: nrBedsSelector;
  justify-self: end;
`;
