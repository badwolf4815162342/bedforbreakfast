import { Button } from '@material-ui/core';
import styled from 'styled-components';
import { Section, Title } from '../StyledComponents/StyledBasicItems';
import Rating from './Rating/Rating';

export const ReferenceTitle = styled(Title)`
  grid-column: 1/7;
  grid-row: 2;
`;

export const FeedbackPage = styled(Section)`
  margin-left: 10vw;
  margin-right: 10vw;
`;

export const FeedbackCard = styled.div`
  box-shadow: 2px 2px 2px 1px rgba(0, 0, 0, 0.2);
  display: grid;
  grid-gap: 10px;
  grid-template-columns: repeat(6, 1fr);
  padding: 20px;
  border-radius: 15px;
`;

export const ContinueButton = styled(Button)`
  grid-column: 1/7;
  grid-row: 2/2;
`;

export const RatingContainer = styled(Rating)``;
