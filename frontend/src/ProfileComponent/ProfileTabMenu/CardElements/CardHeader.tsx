import React from 'react';
import Moment from 'react-moment';
import pic from '../../../images/user2.jpeg';
import { GridContainerR as GridContainer } from '../../../StyledComponents/StyledBasicItems';
import { Date, Divider, HomeInfo, Name, ProfilePic, ProfilePicBox, Role, UserInfo } from './CardHeaderStyle';

interface CardHeaderProps {
  authorName: string;
  aHomeTown: string;
  aHomeCountry: string;
  role: string;
  date: Date;
  //profile pictures + report pictures
}

class CardHeader extends React.Component<CardHeaderProps, {}> {
  role = this.props.role === 'accommodation' ? 'hosted' : 'visited';
  aPic = <img src={pic} style={{ width: 65, height: 65, borderRadius: 180 }} alt="Card" />;

  render() {
    return (
      <GridContainer>
        <Role>{this.role}</Role>
        <ProfilePicBox>
          <ProfilePic>{this.aPic}</ProfilePic>
        </ProfilePicBox>
        <UserInfo>
          <Name>{this.props.authorName}</Name>
          <HomeInfo>
            From: {this.props.aHomeTown}, {this.props.aHomeCountry}
          </HomeInfo>
        </UserInfo>
        <Date>
          <Moment date={this.props.date} format="dd-mm-yyyy" />
        </Date>
        <Divider />
      </GridContainer>
    );
  }
}

export default CardHeader;
