import { Divider as divider, Switch, TextField } from '@material-ui/core';
import styled from 'styled-components';
import {
  Subtitle as subTitle,
  Title,
} from '../../StyledComponents/StyledBasicItems';

export const AccommodationTitle = styled(Title)`
  grid-column: 1/7;
  grid-row: 1;
`;

export const Divider = styled(divider)`
  grid-column: 1/7;
  grid-row: 2;
`;

export const EnableText = styled.p`
  margin: 0;
  grid-column: 1/4;
  grid-row: 3;
`;

export const EnableSelector = styled(Switch)`
  grid-column: 6/6;
  justify-self: end;
  grid-row: 3;
`;

export const NrBedsText = styled.p`
  margin: 0;
  grid-column: 1/4;
  grid-row: 4;
`;

export const NrBedsSelector = styled(TextField)`
  grid-column: 5/7;
  grid-row: 4;
`;

export const NrBedsIcon = styled.svg`
  grid-column: 6/6;
  justify-self: end;
  grid-row: 4;
`;

export const Subtitle = styled(subTitle)`
  grid-column: 1/7;
  grid-row: 5;
`;

export const StreetName = styled(TextField)`
  grid-column: 1/5;
  grid-row: 6;
`;

export const StreetNumber = styled(TextField)`
  grid-column: 5/7;
  grid-row: 6;
`;

export const StreetNumberIcon = styled.svg`
  grid-column: 6/6;
  justify-self: end;
  grid-row: 6;
`;

export const ZipCode = styled(TextField)`
  grid-column: 1/3;
  grid-row: 7;
`;

export const CityName = styled(TextField)`
  grid-column: 3/7;
  grid-row: 7;
`;

export const CityNameIcon = styled.svg`
  grid-column: 6/6;
  justify-self: end;
  grid-row: 7;
`;

export const Country = styled(TextField)`
  grid-column: 1/7;
  grid-row: 8;
`;

export const CountryIcon = styled.svg`
  grid-column: 6/6;
  justify-self: end;
  grid-row: 8;
`;
