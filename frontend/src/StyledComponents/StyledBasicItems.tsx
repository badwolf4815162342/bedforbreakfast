import { Button } from '@material-ui/core';
import styled from 'styled-components';
import { ScreenSizes } from './Screensizes';
import { MainTheme } from './Theme';

export const GridContainer = styled.div`
  display: grid;
  grid-template-columns: auto auto auto auto auto auto auto;
  grid-column-gap: 1vw;
  grid-row-gap: 10px;
  align-items: flex-end;
`;

export const GridContainerMD = styled(GridContainer)`
  margin-right: 2vw;
  margin-left: 2vw;
  grid-template-columns: 7vw 7vw 7vw 7vw 7vw 7vw 7vw 7vw 7vw 7vw 7vw 7vw;
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

export const GridContainerTR = styled(GridContainer)`
  grid-template-columns: 100px 100px auto;
  grid-template-rows: 60px 10px auto 10px 60px;
`;

export const GridContainerR = styled(GridContainer)`
  grid-template-columns: 100px 100px auto;
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

export const SimpleLabelText = styled.div`
  color: ${MainTheme.grey.dark};
  margin-bottom: 20px;
`;

export const Text = styled.div`
  color: ${MainTheme.grey.dark};
  font-size: 14px;
  line-height: 20px;
`;

export const SubText = styled.sub`
  color: ${MainTheme.grey.dark};
`;

export const SubmitButton = styled(Button)`
  float: right;
  width: 25%;
`;
