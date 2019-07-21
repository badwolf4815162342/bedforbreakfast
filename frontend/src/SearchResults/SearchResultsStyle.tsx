import { Button, Checkbox, TextField } from '@material-ui/core';
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
  margin-left: 4vw;
  margin-right: 4vw;
  display: grid;
  grid-gap: 40px;
  grid-template-columns: repeat(12, 1fr);
  grid-template-rows: auto;
`;

export const Title = styled.h2`
  margin: 0;
  grid-column: 1/13;
`;

export const FilterArea = styled.div`
  box-shadow: 2px 2px 2px 1px rgba(0, 0, 0, 0.2);
  grid-column: 1/4;
  display: grid;
  grid-gap: 10px;
  grid-template-columns: repeat(6, 1fr);
  grid-template-rows: 5vh 5vh 5vh 7vh 5vh 5vh 5vh 5vh 5vh 5vh 5vh 3vh;
  padding: 20px;
  border-radius: 15px;
`;

export const FilterHeader = styled.h2`
  grid-column: 1/7;
  grid-row: 1/1;
`;
export const HasRatingsArea = styled.p`
  grid-column: 1/5;
  grid-row: 2/2;
  align-self: center;
`;

export const IsVerifiedArea = styled.p`
  grid-column: 1/5;
  grid-row: 3/3;
  align-self: center;
`;

export const NumberOfBedsArea = styled.p`
  grid-column: 1/5;
  grid-row: 5/5;
  align-self: center;
`;

export const NumberOfBedsField = styled(TextField)`
  grid-column: 5/7;
  grid-row: 5/5;
  align-self: center;
`;

export const DistrictArea = styled.div`
  grid-column: 1/7;
  grid-row: 6/10;
`;

export const Districts = styled.div`
  width: 100%;
  height: 100%;
  overflow: scroll;
  border: 1px solid ${MainTheme.grey.main};
`;

export const District = styled.div`
  display: grid;
`;

export const DistrictName = styled.p`
  grid-column: 1/3;
`;

export const DistrictCheckbox = styled(Checkbox)`
  grid-column: 3/4;
`;

export const ApplyButton = styled(Button)`
  grid-column: 1/7;
  grid-row: 11/11;
`;

export const ResetButton = styled(Button)`
  grid-column: 1/7;
  grid-row: 12/12;
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

export const CheckboxRight = styled(Checkbox)`
  grid-column: 5/7;
`;

export const ResultContainer = styled.div`
  grid-column: 4/17;
  overflow: scroll;
  max-height: 77vh;
`;
