import Icon from '@material-ui/core/Icon';
import React from 'react';

import { IconButton } from '@material-ui/core';
import {
  Description,
  HostContainer,
  Name,
  ProfilePic,
  ProfilePicBox,
  RatingTitle,
  ThumbsDown,
  ThumbsUp,
  Verified,
} from './RatingStyle';

const Rating: React.FC<{
  receiver: { firstName: string; lastName: string; verified: boolean; profilePicture: string };
  rating: boolean | undefined;
  onRatingChange: (rating: boolean) => void;
  onDescriptionChange: (description: string) => void;
}> = ({ receiver: { firstName, lastName, verified, profilePicture }, rating, onRatingChange, onDescriptionChange }) => {
  return (
    <HostContainer>
      <ProfilePicBox>
        <ProfilePic>
          {' '}
          <img
            src={profilePicture}
            alt={`${firstName} ${lastName[0]}.`}
            style={{ width: 185, height: 185, borderRadius: 180 }}
          />{' '}
        </ProfilePic>
      </ProfilePicBox>

      <Name>
        {firstName} {lastName[0]}.
        {verified && (
          <Verified>
            <Icon>verified</Icon>
          </Verified>
        )}
      </Name>

      <ThumbsUp>
        <IconButton
          color={rating === undefined ? 'default' : rating ? 'secondary' : 'default'}
          onClick={() => onRatingChange(true)}
        >
          <Icon>thumb_up</Icon>
        </IconButton>
      </ThumbsUp>
      <ThumbsDown>
        <IconButton
          color={rating === undefined ? 'default' : !rating ? 'secondary' : 'default'}
          onClick={() => onRatingChange(false)}
        >
          <Icon>thumb_down</Icon>
        </IconButton>
      </ThumbsDown>

      <RatingTitle>How was your host {firstName} and his guest room?</RatingTitle>

      <Description
        multiline
        rows="6"
        label="Reference"
        placeholder="Explain your rating."
        variant="outlined"
        onChange={(e) => onDescriptionChange(e.target.value)}
      />
    </HostContainer>
  );
};

export default Rating;
