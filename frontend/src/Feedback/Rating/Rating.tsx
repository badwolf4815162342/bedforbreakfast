import Icon from '@material-ui/core/Icon';
import React from 'react';

import { IconButton } from '@material-ui/core';
import { Section } from '../../StyledComponents/StyledBasicItems';
import { MainTheme } from '../../StyledComponents/Theme';
import {
  Description,
  DescriptionIcon,
  FlexContainer,
  HostContainer,
  Name,
  ProfilePic,
  ProfilePicBox,
  RatingContainer,
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
    <Section>
      <FlexContainer>
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
                <Icon>check_circle</Icon>
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
        </HostContainer>

        <RatingContainer>
          <RatingTitle>How was your host {firstName} and his guest room?</RatingTitle>

          <Description
            multiline
            label="Reference"
            placeholder="Explain your rating."
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
        </RatingContainer>
      </FlexContainer>
    </Section>
  );
};

export default Rating;
