import { Divider as divider, Switch, TextField } from '@material-ui/core';
import styled from 'styled-components';
import { Subtitle as subTitle, Title } from '../../StyledComponents/StyledBasicItems';

export const AccommodationTitle = styled(Title)`
  grid-column: 1/7;
  grid-row: 1;
`;

export const Divider = styled(divider)`
  grid-column: 1/7;
  grid-row: 2;
`;

export const GeneralSubtitle = styled(subTitle)`
  grid-column: 1/7;
  grid-row: 3;
`;

export const EnableText = styled.p`
  margin: 0;
  grid-column: 1/4;
  grid-row: 4;
`;

export const EnableSelector = styled(Switch)`
  grid-column: 6/6;
  justify-self: end;
  grid-row: 4;
`;

export const NrBedsText = styled.p`
  margin: 0;
  grid-column: 1/4;
  grid-row: 5;
`;

export const NrBedsSelector = styled(TextField)`
  grid-column: 5/7;
  grid-row: 5;
`;

export const NrBedsIcon = styled.svg`
  grid-column: 6/6;
  justify-self: end;
  grid-row: 5;
`;

export const Description = styled(TextField)`
  grid-column: 1/7;
  grid-row: 6;
`;

export const DescriptionIcon = styled.svg`
  grid-column: 6/6;
  justify-self: end;
  grid-row: 6;
`;

export const AddressSubtitle = styled(subTitle)`
  grid-column: 1/7;
  grid-row: 7;
`;

export const StreetName = styled(TextField)`
  grid-column: 1/5;
  grid-row: 8;
`;

export const StreetNumber = styled(TextField)`
  grid-column: 5/7;
  grid-row: 8;
`;

export const StreetNumberIcon = styled.svg`
  grid-column: 6/6;
  justify-self: end;
  grid-row: 8;
`;

export const ZipCode = styled(TextField)`
  grid-column: 1/2;
  grid-row: 9;
`;

export const District = styled(TextField)`
  grid-column: 2/4;
  grid-row: 9;
`;

export const CityName = styled(TextField)`
  grid-column: 4/7;
  grid-row: 9;
`;

export const CityNameIcon = styled.svg`
  grid-column: 6/6;
  justify-self: end;
  grid-row: 9;
`;

export const Country = styled(TextField)`
  grid-column: 1/7;
  grid-row: 10;
`;

export const CountryIcon = styled.svg`
  grid-column: 6/6;
  justify-self: end;
  grid-row: 10;
`;

export const SelectedPictures = styled.p`
  text-align: right
  grid-column: 4/7;
  grid-row: 11;
`;

export const UploadContainer = styled.div`
  grid-column: 1/3;
  grid-row: 11;
  label {
    width: 100%;
    span {
      width: 100%;
    }
  }
`;

export const SubmitArea = styled.div`
  grid-column: 1/7;
  grid-row: 12;
`;

export const Error = styled.div`
  color: red;
  text-align: left;
  margin-top: 15px;
  margin-bottom: 15px;
`;
