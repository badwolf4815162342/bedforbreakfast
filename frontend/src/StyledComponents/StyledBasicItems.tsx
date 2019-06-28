import styled from 'styled-components';
import { MainTheme } from './Theme';

export const Container = styled.div`
  margin-right: 5%;
  margin-left: 5%;
`;

export const GridContainer = styled(Container)`
  display: grid;
  grid-template-columns: auto auto auto;
  grid-column-gap: 10px;
  grid-row-gap: 10px;
  align-items: flex-end;
`;

export const Section = styled.div`
  margin-top: 50px;
`;

export const Title = styled.h1`
  font-size: 1.5em;
  color: ${MainTheme.secondary.main};
`;

export const Subtitle = styled.h3`
  color: ${MainTheme.secondary.dark};
`;

export const SubtitleSubtext = styled.p`
  color: ${MainTheme.grey.main};
`;
