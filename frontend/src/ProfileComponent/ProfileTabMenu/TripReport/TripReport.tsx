import React from 'react';
import pic from '../../../images/user2.jpeg';
import SimpleSlider from '../../../StyledComponents/ImageSlider/ImageSlider';
import CardHeader from '../CardElements/CardHeader';
import { ImagesCarousel, Report, TripReportCard, TripReportPaper } from './TripReportStyle';

interface TripReportProps {
  receiverId: string;
  receiverRole: string;
  receiverFirstName: string;
  receiverLastName: string;
  receiverHomeTown: string;
  receiverHomeCountry: string;
  receiverVerified: boolean;
  profilePicture: string;
  dateStart: Date;
  dateEnd: Date;
  description: string;
  likeCount: number;
  liked: boolean;
  reportPictures: string[];
}

class TripReport extends React.Component<TripReportProps, {}> {
  role = this.props.receiverRole === 'ACCOMMODATION' ? 'visited' : 'hosted';
  liked = this.props.liked ? 'favorite' : 'favorite_border';
  profilePic = <img src={pic} style={{ width: 65, height: 65, borderRadius: 180 }} alt="Profile" />;

  render() {
    return (
      <TripReportCard>
        <CardHeader
          authorId={this.props.receiverId}
          receiverRole={this.props.receiverRole}
          authorFirstName={this.props.receiverFirstName}
          authorLastName={this.props.receiverLastName}
          aHomeTown={this.props.receiverHomeTown}
          aHomeCountry={this.props.receiverHomeCountry}
          dateStart={this.props.dateStart}
          dateEnd={this.props.dateEnd}
          profilePicture={this.props.profilePicture}
          verified={this.props.receiverVerified}
        />
        <ImagesCarousel>
          <SimpleSlider height={240} images={this.props.reportPictures} />
        </ImagesCarousel>
        <TripReportPaper>
          <Report> {this.props.description} </Report>
        </TripReportPaper>
      </TripReportCard>
    );
  }
}

export default TripReport;
