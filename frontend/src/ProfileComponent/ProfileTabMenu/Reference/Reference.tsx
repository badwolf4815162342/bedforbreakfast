import Icon from '@material-ui/core/Icon';
import React from 'react';
import CardHeader from '../CardElements/CardHeader';
import { IconInText, Rate, ReferenceCard, ReferenceReportPaper, Report } from './ReferenceStyle';

interface ReferenceProps {
  authorId: string;
  authorFirstName: string;
  authorLastName: string;
  authorVerified: boolean;
  aHomeTown: string;
  aHomeCountry: string;
  receiverRole: string;
  dateStart: Date;
  dateEnd: Date;
  text: string;
  isPositive: boolean;
  profilePicture: string;
  //report pictures
}

class Reference extends React.Component<ReferenceProps, {}> {
  rate = this.props.isPositive ? 'thumb_up' : 'thumb_down';
  rateLabel = this.props.isPositive ? 'Positive' : 'Negative';

  render() {
    return (
      <ReferenceCard>
        <CardHeader
          authorId={this.props.authorId}
          receiverRole={this.props.receiverRole}
          authorFirstName={this.props.authorFirstName}
          authorLastName={this.props.authorLastName}
          aHomeTown={this.props.aHomeTown}
          aHomeCountry={this.props.aHomeCountry}
          dateStart={this.props.dateStart}
          dateEnd={this.props.dateEnd}
          profilePicture={this.props.profilePicture}
          verified={this.props.authorVerified}
        />
        <ReferenceReportPaper>
          <IconInText>
            <Icon>{this.rate}</Icon>
            <Rate>{this.rateLabel}</Rate>
          </IconInText>
          <Report>{this.props.text}</Report>
        </ReferenceReportPaper>
      </ReferenceCard>
    );
  }
}

export default Reference;
