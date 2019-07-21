import { Button } from '@material-ui/core';
import React from 'react';

import { Description } from '../Rating/RatingStyle';
import { ImageItem, PicturePreview, TripReportCard, TripReportTitle, UploadInput } from './TripReportStyle';

const TripReport: React.FC<{
  pictures: File[];
  onPicturesChange: (pictures: File[]) => void;
  onDescriptionChange: (description: string) => void;
}> = ({ pictures, onPicturesChange, onDescriptionChange }) => {
  return (
    <TripReportCard>
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
          <Button variant="contained" component="span" color="primary" fullWidth>
            Upload Pictures*
          </Button>
        </label>
      </UploadInput>
      <PicturePreview>
        {pictures.map((picture: File) => (
          <ImageItem src={URL.createObjectURL(picture)} alt={picture.name} key={picture.name}></ImageItem>
        ))}
      </PicturePreview>
      <TripReportTitle>Describe your experiences? Add pictures!</TripReportTitle>

      <Description
        multiline
        rows="21"
        variant="outlined"
        label="Trip Report"
        placeholder="Tell us some great stories from your trip."
        onChange={(e) => onDescriptionChange(e.target.value)}
      />
    </TripReportCard>
  );
};

export default TripReport;
