import styled from 'styled-components';
import { Section, Title } from '../StyledComponents/StyledBasicItems';

export const RequestTitle = styled(Title)`
  grid-column: 1/7;
  grid-row: 1;
`;

export const RequestPage = styled(Section)`
  margin-left: 10vw;
  margin-right: 10vw;

  display: grid;
  grid-gap: 20px;
  grid-template-columns: repeat(6, 1fr);
`;
