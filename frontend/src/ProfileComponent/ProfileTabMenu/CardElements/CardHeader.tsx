import React from 'react';
import Moment from 'react-moment';
import { GridContainerR as GridContainer } from '../../../StyledComponents/StyledBasicItems';
import { Date, Divider, HomeInfo, Name, ProfilePic, ProfilePicBox, Role, UserInfo } from './CardHeaderStyle';

interface CardHeaderProps {
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
          <ProfilePic>{authorPicture}</ProfilePic>
        </ProfilePicBox>
        <UserInfo>
          <Name>
            {this.props.authorFirstName} {this.props.authorLastName}{' '}
          </Name>
          <HomeInfo>
            From: {this.props.aHomeTown}, {this.props.aHomeCountry}
          </HomeInfo>
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
