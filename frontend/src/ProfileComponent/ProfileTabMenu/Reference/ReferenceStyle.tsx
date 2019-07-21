import { Box, Card, Divider as divider } from '@material-ui/core';
import styled from 'styled-components';
import { SimpleLabelText, SubText, Text } from '../../../StyledComponents/StyledBasicItems';
import { MainThemeRGB } from '../../../StyledComponents/Theme';

export const ReferenceCard = styled(Card)`
  margin-top: 20px
  margin-bottom: 0px
  padding: 15px
  width: inherit
  position: relative;
  border-radius: 15px !important
  align-items: center
`;

export const ReferenceReportPaper = styled(Box)`
  padding: 15px
  display: flex
  margin-top: 15px
  margin-bottom: 15px
`;

export const Divider = styled(divider)`
  grid-column-start: 1;
  grid-column-end: column4-end;
  align-self: baseline;
`;

export const Report = styled(Text)``;

export const IconInText = styled(SubText)`
  margin-right: 20px
  margin-left: 0px
  align-self: start;
  justify-self: start;
  color: rgba(${MainThemeRGB.secondary.main.r}, ${MainThemeRGB.secondary.main.g}, ${MainThemeRGB.secondary.main.b}, 1);
`;

export const NoReferencesLabe = styled(SimpleLabelText)`
  text-align: center;
`;
