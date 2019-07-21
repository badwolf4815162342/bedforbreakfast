import Icon from '@material-ui/core/Icon';
import React from 'react';
import pic from '../../../images/user2.jpeg';
import { GridContainerTR as GridContainer } from '../../../StyledComponents/StyledBasicItems';
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
  receiverRole: string;
  receiverFirstName: string;
  receiverLastName: string;
  receiverHomeTown: string;
  receiverHomeCountry: string;
  dateStart: Date;
  dateEnd: Date;
  description: string;
  likeCount: number;
  liked: boolean;
  //profile picture + report pictures
}

class TripReport extends React.Component<TripReportProps, {}> {
  role = this.props.receiverRole === 'accommodation' ? 'visited' : 'hosted';
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
            <Name>
              {this.props.receiverFirstName} {this.props.receiverLastName}
            </Name>
            <HomeInfo>
              From: {this.props.receiverHomeTown}, {this.props.receiverHomeCountry}
            </HomeInfo>
          </UserInfo>
          <Date>{this.props.dateEnd.toString}</Date>
          <Divider />
          <TripReportPaper>
            <Report> {this.props.description} </Report>
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
