import { Button } from '@material-ui/core';
import styled from 'styled-components';
import { Section } from '../StyledComponents/StyledBasicItems';
import { MainTheme } from '../StyledComponents/Theme';
import SearchResultCard from './SearchResultCard/SearchResultCard';

export const StyledSearchResultCard = styled(SearchResultCard)`
  margin-bottom: 20px;
`;

export const Space = styled.div`
  height: 20px;
`;

export const Results = styled(Section)`
  margin-left: 2vw;
  margin-right: 2vw;
  display: grid;
  grid-gap: 10px;
  grid-template-columns: repeat(12, 1fr);
  grid-template-rows: auto;
`;

export const Title = styled.h2`
  grid-column: 1/13;
`;

export const FilterArea = styled.div`
  box-shadow: 2px 2px 2px 1px rgba(0, 0, 0, 0.2);
  grid-column: 1/3;
  display: grid;
  grid-gap: 10px;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: 5vh 5vh 5vh 10vh 5vh 5vh 5vh 5vh 5vh 5vh 5vh;
  padding: 20px;
`;

export const FilterHeader = styled.h2`
  grid-column: 1/7;
  grid-row: 1/1;
`;
export const HasRatingsArea = styled.div`
  grid-column: 1/7;
  grid-row: 2/2;
`;

export const IsVerifiedArea = styled.div`
  grid-column: 1/7;
  grid-row: 3/3;
`;

export const ApplyButton = styled(Button)`
  grid-column: 1/7;
  grid-row: 10/10;
`;

export const ResetButton = styled(Button)`
  grid-column: 1/7;
  grid-row: 11/11;
`;

export const SelectContainer = styled.div`
  grid-column: 1/7;
  grid-row: 4/5;
  padding: 6px 0 7px;
  select {
    font: inherit;
    width: 100%;
    background-color: ${MainTheme.grey.light};
    border: 1px solid ${MainTheme.grey.light};
    height: 25px;
    box-sizing: content-box;
    :hover {
      border: 1px solid ${MainTheme.primary.main};
    }
  }
`;

export const ResultContainer = styled.div`
  grid-column: 3/13;
  overflow: scroll;
  max-height: 76vh;
`;
