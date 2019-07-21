import { Button, Tab } from '@material-ui/core';
import React from 'react';
import { ProfileTabMenuBox, ProfileTabs } from './ProfileTabMenuStyle';
import ReferenceList from './Reference/ReferenceList';
import SendRequest from './SendRequest';
import TripReportList from './TripReport/TripReportList';

export default function ProfileTabMenu(props: { userId: string; userName: string }) {
  const [value, setValue] = React.useState(0);

  const tripReportSection = <TripReportList userId={props.userId} />;
  const referenceSection = <ReferenceList userId={props.userId} />;
  const accommodationSection = <Button>accommodation</Button>;
  const foodSection = <Button>{props.userId}</Button>;

  const [section, setSection] = React.useState(tripReportSection);

  function handleChange(event: React.ChangeEvent<{}>, newValue: number) {
    setValue(newValue);

    switch (newValue) {
      case 0:
        setSection(tripReportSection);
        break;
      case 1:
        setSection(referenceSection);
        break;
      case 2:
        setSection(accommodationSection);
        break;
      case 3:
        setSection(foodSection);
        break;
      default:
        setSection(tripReportSection);
        break;
    }
  }

  return (
    <ProfileTabMenuBox>
      <ProfileTabs value={value} onChange={handleChange}>
        <Tab label="Trip reports" />
        <Tab label="References" />
        <Tab label="Accommodation" />
        <Tab label="Food" />
        <SendRequest userId={props.userId} userName={props.userName} />
      </ProfileTabs>
      {section}
    </ProfileTabMenuBox>
  );
}
