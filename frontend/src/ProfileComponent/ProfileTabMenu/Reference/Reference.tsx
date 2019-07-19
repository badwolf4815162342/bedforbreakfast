import Icon from '@material-ui/core/Icon';
import React from 'react';
import CardHeader from '../CardElements/CardHeader';
import { IconInText, ReferenceCard, ReferenceReportPaper, Report } from './ReferenceStyle';

interface ReferenceProps {
  authorName: string;
  aHomeTown: string;
  aHomeCountry: string;
  role: string;
  date: Date;
  text: string;
  isPositive: boolean;
  //profile picture + report pictures
}

class Reference extends React.Component<ReferenceProps, {}> {
  rate = this.props.isPositive ? 'thumb_up' : 'thumb_down';
  rateLabel = this.props.isPositive ? 'Positive' : 'Negative';

  render() {
    return (
      <ReferenceCard>
        <CardHeader
          role={this.props.role}
          authorName={this.props.authorName}
          aHomeTown={this.props.aHomeTown}
          aHomeCountry={this.props.aHomeCountry}
          date={this.props.date}
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
