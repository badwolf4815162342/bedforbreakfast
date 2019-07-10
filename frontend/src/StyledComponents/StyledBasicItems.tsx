import styled from 'styled-components';
import { ScreenSizes } from './Screensizes';
import { MainTheme } from './Theme';

export const GridContainer = styled.div`
  display: grid;
  grid-template-columns: auto auto auto;
  grid-column-gap: 10px;
  grid-row-gap: 10px;
  align-items: flex-end;
`;

export const GridContainerMD = styled(GridContainer)`
  margin-right: 5%;
  margin-left: 5%;
`;

export const GridContainerXS = styled(GridContainer)`
  @media (max-width: ${ScreenSizes.md}) {
    margin-right: 5%;
    margin-left: 5%;
  }
  @media (min-width: ${ScreenSizes.md}) {
    margin-right: 20%;
    margin-left: 20%;
  }
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
  color: ${MainTheme.grey.dark};
`;

export const Text = styled.p`
  color: ${MainTheme.grey.dark};
  font-size: 14px;
  line-height: 20px;
`;

export const SubText = styled.sub`
  color: ${MainTheme.grey.dark};
`;
