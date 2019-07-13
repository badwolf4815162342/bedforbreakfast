import styled from 'styled-components';

export const CardAccommodation = styled.div`
  box-shadow: 2px 2px 2px 1px rgba(0, 0, 0, 0.2);
  grid-column: 1/13;
  display: grid;
  grid-gap: 10px;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: repeat(5, 1fr);
`;

export const ImageContainerAccommodation = styled.div`
  grid-column-start: 1;
  grid-column-end: 1;
  grid-row-start: 1;
  grid-row-end: 6;
`;

export const ImageAccommodation = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;
