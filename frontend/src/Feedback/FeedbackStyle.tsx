import { Button } from '@material-ui/core';
import styled from 'styled-components';
import { Section, Title } from '../StyledComponents/StyledBasicItems';
import { MainThemeRGB } from '../StyledComponents/Theme';

export const ReferenceTitle = styled(Title)`
  grid-column: 1/7;
  grid-row: 2;
`;

export const FeedbackPage = styled(Section)`
  margin-left: 10vw;
  margin-right: 10vw;
`;

export const FeedbackCard = styled.div`
  -webkit-box-shadow: 3px 5px 14px -2px rgba(${MainThemeRGB.grey.dark.r}, ${MainThemeRGB.grey.dark.g}, ${MainThemeRGB.grey.dark.b}, 1);
  -moz-box-shadow: 3px 5px 14px -2px rgba(${MainThemeRGB.grey.dark.r}, ${MainThemeRGB.grey.dark.g}, ${MainThemeRGB.grey.dark.b}, 1);
  box-shadow: 3px 5px 14px -2px rgba(${MainThemeRGB.grey.dark.r}, ${MainThemeRGB.grey.dark.g}, ${MainThemeRGB.grey.dark.b}, 1);
  display: grid;
  grid-gap: 40px;
  grid-template-columns: repeat(6, 1fr);
  padding: 20px;
  border-radius: 15px;
`;

export const ContinueButton = styled(Button)`
  grid-column: 1/7;
  grid-row: 2/2;
`;
