import { TextField } from '@material-ui/core';
import styled from 'styled-components';
import { Subtitle as Title } from '../../StyledComponents/StyledBasicItems';

export const TripReportCard = styled.div`
  grid-column: 1/7;
  display: grid;
  grid-gap: 10px;
  grid-template-columns: repeat(6, 1fr);
`;

export const PictureUploadContainer = styled.div`
  grid-column: 1/4;
  grid-row: 1/5
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
  grid-row: 1/1;
  grid-column: 1/4;
`;

export const PicturePreview = styled.div`
  grid-row: 2/7;
  grid-column: 1/4;

  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  grid-auto-rows: auto;
  grid-gap: 1rem;

  max-height: 51vh;
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
  grid-column: 4/7;
  grid-row: 1;
  margin-top: 0;
`;

export const Description = styled(TextField)`
  grid-column: 4/7;
  grid-row: 2/7;
`;

export const DescriptionIcon = styled.svg`
  grid-column: 4;
  grid-row: 3/7;

  justify-self: end;
`;
