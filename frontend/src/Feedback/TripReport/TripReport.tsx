import { Button } from '@material-ui/core';
import React from 'react';

import { Section } from '../../StyledComponents/StyledBasicItems';
import { MainTheme } from '../../StyledComponents/Theme';
import { Description, DescriptionIcon } from '../Rating/RatingStyle';
import {
  FlexContainer,
  ImageItem,
  PicturePreview,
  PictureUploadContainer,
  TripReportContainer,
  TripReportTitle,
  UploadInput,
} from './TripReportStyle';

const TripReport: React.FC<{
  pictures: File[];
  onPicturesChange: (pictures: File[]) => void;
  onDescriptionChange: (description: string) => void;
}> = ({ pictures, onPicturesChange, onDescriptionChange }) => {
  return (
    <Section>
      <FlexContainer>
        <PictureUploadContainer>
          <UploadInput>
            <input
              accept="image/*"
              style={{ display: 'none' }}
              id="raised-button-file"
              multiple
              type="file"
              onChange={(e) => {
                if (e.target.files) {
                  onPicturesChange(Array.from(e.target.files));
                }
              }}
            />
            <label htmlFor="raised-button-file">
              <Button variant="contained" component="span">
                Upload Pictures*
              </Button>
            </label>
          </UploadInput>
          <PicturePreview>
            {pictures.map((picture: File) => (
              <ImageItem src={URL.createObjectURL(picture)} alt={picture.name} key={picture.name}></ImageItem>
            ))}
          </PicturePreview>
        </PictureUploadContainer>

        <TripReportContainer>
          <TripReportTitle>Describe your experiences? Add pictures!</TripReportTitle>

          <Description
            multiline
            label="Trip Report"
            placeholder="Tell us some great stories from your trip."
            onChange={(e) => onDescriptionChange(e.target.value)}
          />
          <DescriptionIcon
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 512 600"
            fill={MainTheme.grey.dark}
          >
            <path
              d="M328.883,89.125l107.59,107.589l-272.34,272.34L56.604,361.465L328.883,89.125z M518.113,63.177l-47.981-47.981
      c-18.543-18.543-48.653-18.543-67.259,0l-45.961,45.961l107.59,107.59l53.611-53.611
      C532.495,100.753,532.495,77.559,518.113,63.177z M0.3,512.69c-1.958,8.812,5.998,16.708,14.811,14.565l119.891-29.069
      L27.473,390.597L0.3,512.69z"
            />
          </DescriptionIcon>
        </TripReportContainer>
      </FlexContainer>
    </Section>
  );
};

export default TripReport;
