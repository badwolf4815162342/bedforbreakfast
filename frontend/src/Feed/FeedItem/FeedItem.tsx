import { Icon, IconButton } from '@material-ui/core';
import gql from 'graphql-tag';
import React from 'react';
import { Mutation } from 'react-apollo';
import Moment from 'react-moment';
import SimpleSlider from '../../StyledComponents/ImageSlider/ImageSlider';
import { RoleType, TripReport, User } from '../Feed';
import { USER_ID } from './../../../src/constants';
import { MainTheme } from './../../StyledComponents/Theme';
import {
  AuthorInfo,
  AuthorPicBox,
  Date,
  DescriptionArea,
  DividerStyled,
  FeedCard,
  HeaderLink,
  HomeInfo,
  IconInText,
  ImagesCarousel,
  LikeCounter,
  Name,
  ReceiverInfo,
  ReceiverPic,
  ReceiverPicBox,
  Role,
} from './FeedItemStyle';

const LIKE_TRIP_REPORT = gql`
  mutation likeTripReport($_id: String!) {
    likeTripReport(likeTripReportDto: { _id: $_id }) {
      _id
      likedBy {
        _id
      }
      description
      pictures
    }
  }
`;
interface FeedItemProps {
  tripReport: TripReport;
}

function resolveRole(role: RoleType) {
  return role === RoleType.ACCOMMODATION ? 'visited' : 'hosted';
}

function userId() {
  let user = '';
  if (localStorage.getItem(USER_ID) !== null) {
    user = localStorage.getItem(USER_ID) || '{}';
    return user;
  } else {
    return '';
  }
}

export const FeedItem: React.FC<FeedItemProps> = (feedItem: FeedItemProps) => (
  <FeedCard>
    <AuthorPicBox>
      <HeaderLink to={`/profile/${feedItem.tripReport.author._id}`}>
        <ReceiverPic>
          <img
            src={feedItem.tripReport.author.profilePicture}
            style={{ width: 65, height: 65, borderRadius: 180 }}
            alt="Card"
          />
        </ReceiverPic>
      </HeaderLink>
    </AuthorPicBox>
    <AuthorInfo>
      <HeaderLink to={`/profile/${feedItem.tripReport.author._id}`}>
        <Name>
          {feedItem.tripReport.author.firstName} {feedItem.tripReport.author.lastName}{' '}
          {feedItem.tripReport.author.verified && (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 23 23"
              fill={MainTheme.secondary.main}
            >
              <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm-2 16l-4-4 1.41-1.41L10 14.17l6.59-6.59L18 9l-8 8z" />
            </svg>
          )}
        </Name>
        <HomeInfo>
          From: {feedItem.tripReport.author.homeTown}, {feedItem.tripReport.author.homeCountry}
        </HomeInfo>
      </HeaderLink>
    </AuthorInfo>
    <Role>{resolveRole(feedItem.tripReport.receiverRole)}</Role>
    <ReceiverPicBox>
      <HeaderLink to={`/profile/${feedItem.tripReport.receiver._id}`}>
        <ReceiverPic>
          <img
            src={feedItem.tripReport.receiver.profilePicture}
            style={{ width: 65, height: 65, borderRadius: 180 }}
            alt="Card"
          />
        </ReceiverPic>
      </HeaderLink>
    </ReceiverPicBox>
    <ReceiverInfo>
      <HeaderLink to={`/profile/${feedItem.tripReport.receiver._id}`}>
        <Name>
          {feedItem.tripReport.receiver.firstName} {feedItem.tripReport.receiver.lastName}{' '}
          {feedItem.tripReport.receiver.verified && (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 23 23"
              fill={MainTheme.secondary.main}
            >
              <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm-2 16l-4-4 1.41-1.41L10 14.17l6.59-6.59L18 9l-8 8z" />
            </svg>
          )}
        </Name>
        <HomeInfo>
          From: {feedItem.tripReport.receiver.homeTown}, {feedItem.tripReport.receiver.homeCountry}
        </HomeInfo>
      </HeaderLink>
    </ReceiverInfo>
    <Date>
      <Moment date={feedItem.tripReport.request.end} format="MMMM, YYYY, " />
      <Moment from={feedItem.tripReport.request.end} ago>
        {feedItem.tripReport.request.start.toString()}
      </Moment>
    </Date>
    <DividerStyled />
    <ImagesCarousel>
      <SimpleSlider height={240} images={feedItem.tripReport.pictures} />
    </ImagesCarousel>
    <DescriptionArea>{feedItem.tripReport.description}</DescriptionArea>
    <DividerStyled />
    <IconInText>
      <Mutation mutation={LIKE_TRIP_REPORT}>
        {(
          likeTripReport: (arg0: {
            variables: {
              _id: string;
            };
          }) => void,
          { data }: any,
        ) => (
          <div>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (localStorage.getItem(USER_ID)) {
                  likeTripReport({
                    variables: {
                      _id: feedItem.tripReport._id,
                    },
                  });
                }
              }}
            >
              <IconButton type="submit" color="secondary">
                <Icon>
                  {feedItem.tripReport.likedBy.filter((user: User) => user._id === userId()).length !== 0
                    ? 'favorite'
                    : 'favorite_border'}
                </Icon>
              </IconButton>
            </form>
          </div>
        )}
      </Mutation>
    </IconInText>
    <LikeCounter>{feedItem.tripReport.likedBy.length} </LikeCounter>
  </FeedCard>
);
