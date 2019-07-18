import Icon from '@material-ui/core/Icon';
import React from 'react';
import pic from '../../../../images/user2.jpeg';
import { GridContainerTR as GridContainer } from '../../../../StyledComponents/StyledBasicItems';
import {
  Date,
  Divider,
  HomeInfo,
  IconInText,
  LikeCount,
  Name,
  ProfilePic,
  ProfilePicBox,
  Report,
  Role,
  SeeMoreButton,
  TripReportCard,
  TripReportPaper,
  UserInfo,
} from './TripReportStyle';

interface TripReportProps {
  role: string;
  name: string;
  homeTown: string;
  homeCountry: string;
  date: string;
  text: string;
  likeCount: number;
  liked: boolean;
  //profile picture + report pictures
}

class TripReport extends React.Component<TripReportProps, {}> {
  role = this.props.role === 'accommodation' ? 'hosted' : 'visited';
  liked = this.props.liked ? 'favorite' : 'favorite_border';
  profilePic = <img src={pic} style={{ width: 65, height: 65, borderRadius: 180 }} alt="Profile" />;

  render() {
    return (
      <TripReportCard>
        <GridContainer>
          <Role>{this.role}</Role>
          <ProfilePicBox>
            <ProfilePic>{this.profilePic}</ProfilePic>
          </ProfilePicBox>
          <UserInfo>
            <Name>{this.props.name}</Name>
            <HomeInfo>
              From: {this.props.homeTown}, {this.props.homeCountry}
            </HomeInfo>
          </UserInfo>
          <Date>{this.props.date}</Date>
          <Divider />
          <TripReportPaper>
            <Report> {this.props.text} </Report>
          </TripReportPaper>
          <Divider />
          <LikeCount>
            {' '}
            <IconInText>
              <Icon>{this.liked}</Icon>
            </IconInText>{' '}
            {this.props.likeCount}{' '}
          </LikeCount>
          <SeeMoreButton variant="text" color="secondary">
            {' '}
            see more{' '}
          </SeeMoreButton>
        </GridContainer>
      </TripReportCard>
    );
  }
}

export default TripReport;
