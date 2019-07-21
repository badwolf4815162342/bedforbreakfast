import React from 'react';
import Moment from 'react-moment';
import SimpleSlider from '../../StyledComponents/ImageSlider/ImageSlider';
import { RoleType, TripReport } from '../Feed';
import {
  AuthorInfo,
  AuthorPicBox,
  Date,
  DescriptionArea,
  DividerStyled,
  FeedCard,
  HeaderLink,
  HomeInfo,
  ImagesCarousel,
  Name,
  ReceiverInfo,
  ReceiverPic,
  ReceiverPicBox,
  Role,
} from './FeedItemStyle';

interface FeedItemProps {
  tripReport: TripReport;
}

function resolveRole(role: RoleType) {
  return role === RoleType.ACCOMMODATION ? 'visited' : 'hosted';
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
      <SimpleSlider
        height={240}
        images={[
          'https://media.nomadicmatt.com/2018/accommodations_04.jpg',
          'https://media.nomadicmatt.com/2018/accommodations_04.jpg',
          'https://media.nomadicmatt.com/2018/accommodations_04.jpg',
          'https://media.nomadicmatt.com/2018/accommodations_04.jpg',
          'https://media.nomadicmatt.com/2018/accommodations_04.jpg',
          'https://media.nomadicmatt.com/2018/accommodations_04.jpg',
          'https://media.nomadicmatt.com/2018/accommodations_04.jpg',
          'https://media.nomadicmatt.com/2018/accommodations_04.jpg',
          'https://media.nomadicmatt.com/2018/accommodations_04.jpg',
          'https://media.nomadicmatt.com/2018/accommodations_04.jpg',
          'https://media.nomadicmatt.com/2018/accommodations_04.jpg',
          'https://media.nomadicmatt.com/2018/accommodations_04.jpg',
          'https://media.nomadicmatt.com/2018/accommodations_04.jpg',
          'https://media.nomadicmatt.com/2018/accommodations_04.jpg',
          'https://media.nomadicmatt.com/2018/accommodations_04.jpg',
          'https://media.nomadicmatt.com/2018/accommodations_04.jpg',
          'https://media.nomadicmatt.com/2018/accommodations_04.jpg',
          'https://media.nomadicmatt.com/2018/accommodations_04.jpg',
        ]}
      />
    </ImagesCarousel>
    <DescriptionArea>{feedItem.tripReport.description}</DescriptionArea>
    <DividerStyled />
  </FeedCard>
);
