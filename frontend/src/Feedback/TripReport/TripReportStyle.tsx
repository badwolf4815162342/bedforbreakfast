import { TextField } from '@material-ui/core';
import styled from 'styled-components';
import { Subtitle as Title } from '../../StyledComponents/StyledBasicItems';

export const FlexContainer = styled.div`
  display: flex;
  width: 86vw;

  margin-left: 8vw;
  margin-right: 8vw;
`;

export const PictureUploadContainer = styled.div`
  display: grid;
  grid-template-columns: auto;
  grid-column-gap: 1vw;
  grid-row-gap: 10px;
  align-items: flex-end;

  width: 30%;

  label {
    width: 100%;
    span {
      width: 100%;
    }
  }
`;

export const UploadInput = styled.div`
  grid-row: 1;
`;

export const PicturePreview = styled.div`
  grid-row: 2;

  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  grid-auto-rows: auto;
  grid-gap: 1rem;

  max-height: 60vh;
  overflow: scroll;
`;

export const ImageItem = styled.img`
  width: 100%;
  height: auto;
`;

export const TripReportContainer = styled.div`
  display: grid;
  grid-template-columns: auto auto auto auto;
  grid-column-gap: 1vw;
  grid-row-gap: 10px;
  align-items: flex-end;

  width: 70%;
`;

export const TripReportTitle = styled(Title)`
  grid-column: 1/5;
  grid-row: 1;
`;

export const Description = styled(TextField)`
  grid-column: 1/5;
  grid-row: 3/7;
`;

export const DescriptionIcon = styled.svg`
  grid-column: 4;
  grid-row: 3/7;

  justify-self: end;
`;
