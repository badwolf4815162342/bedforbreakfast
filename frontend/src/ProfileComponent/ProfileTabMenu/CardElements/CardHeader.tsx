import React from 'react';
import Moment from 'react-moment';
import { GridContainerR as GridContainer } from '../../../StyledComponents/StyledBasicItems';
import {
  Date,
  Divider,
  HeaderLink,
  HomeInfo,
  Name,
  ProfilePic,
  ProfilePicBox,
  Role,
  UserInfo,
} from './CardHeaderStyle';

interface CardHeaderProps {
  authorId: string;
  authorFirstName: string;
  authorLastName: string;
  aHomeTown: string;
  aHomeCountry: string;
  receiverRole: string;
  dateStart: Date;
  dateEnd: Date;
  profilePicture: string;
  //profile pictures + report pictures
}

class CardHeader extends React.Component<CardHeaderProps, {}> {
  render() {
    const receiverRole = this.props.receiverRole === 'accommodation' ? 'visited' : 'hosted';
    const authorPicture = (
      <img src={this.props.profilePicture} style={{ width: 65, height: 65, borderRadius: 180 }} alt="Card" />
    );
    const stringStartDate = this.props.dateStart.toString();
    return (
      <GridContainer>
        <Role>{receiverRole}</Role>

        <ProfilePicBox>
          <HeaderLink to={`/profile/${this.props.authorId}`}>
            <ProfilePic>{authorPicture}</ProfilePic>
          </HeaderLink>
        </ProfilePicBox>
        <UserInfo>
          <HeaderLink to={`/profile/${this.props.authorId}`}>
            <Name>
              {this.props.authorFirstName} {this.props.authorLastName}{' '}
            </Name>
            <HomeInfo>
              From: {this.props.aHomeTown}, {this.props.aHomeCountry}
            </HomeInfo>
          </HeaderLink>
        </UserInfo>

        <Date>
          <Moment date={this.props.dateEnd} format="MMMM, YYYY, " />
          <Moment from={this.props.dateEnd} ago>
            {stringStartDate}
          </Moment>
        </Date>
        <Divider />
      </GridContainer>
    );
  }
}

export default CardHeader;
