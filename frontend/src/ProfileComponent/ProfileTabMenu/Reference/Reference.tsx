import Icon from '@material-ui/core/Icon';
import React from 'react';
import CardHeader from '../CardElements/CardHeader';
import { IconInText, ReferenceCard, ReferenceReportPaper, Report } from './ReferenceStyle';

interface ReferenceProps {
  authorID: string;
  authorFirstName: string;
  authorLastName: string;
  aHomeTown: string;
  aHomeCountry: string;
  receiverRole: string;
  dateStart: Date;
  dateEnd: Date;
  text: string;
  isPositive: boolean;
  profilePicture: string;
  //profile picture + report pictures
}

class Reference extends React.Component<ReferenceProps, {}> {
  rate = this.props.isPositive ? 'thumb_up' : 'thumb_down';
  rateLabel = this.props.isPositive ? 'Positive' : 'Negative';

  render() {
    return (
      <ReferenceCard>
        <CardHeader
          authorID={this.props.authorID}
          receiverRole={this.props.receiverRole}
          authorFirstName={this.props.authorFirstName}
          authorLastName={this.props.authorLastName}
          aHomeTown={this.props.aHomeTown}
          aHomeCountry={this.props.aHomeCountry}
          dateStart={this.props.dateStart}
          dateEnd={this.props.dateEnd}
          profilePicture={this.props.profilePicture}
        />
        <ReferenceReportPaper>
          <IconInText>
            <Icon>{this.rate}</Icon>
            {this.rateLabel}
          </IconInText>
          <Report>{this.props.text}</Report>
        </ReferenceReportPaper>
      </ReferenceCard>
    );
  }
}

export default Reference;
