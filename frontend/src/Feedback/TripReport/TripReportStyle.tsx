import { Divider as divider, TextField } from '@material-ui/core';
import styled from 'styled-components';
import { Subtitle as Title } from '../../StyledComponents/StyledBasicItems';

export const TripReportTitle = styled(Title)`
  grid-column: 1/7;
  grid-row: 1;
`;

export const Divider = styled(divider)`
  grid-column: 1/7;
  grid-row: 2;
`;

export const Description = styled(TextField)`
  grid-column: 1/7;
  grid-row: 6;
`;

export const DescriptionIcon = styled.svg`
  grid-column: 6/6;
  justify-self: end;
  grid-row: 3;
`;
