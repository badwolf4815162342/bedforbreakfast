import { Button, Tab } from '@material-ui/core';
import React from 'react';
import { ProfileTabMenuBox, ProfileTabs } from './ProfileTabMenuStyle';
import TripReportList from './ProfileTripReports/TripReport/TripReportList';
import ReferenceList from './Reference/ReferenceList';
import SendRequest from './SendRequest';

export default function ProfileTabMenu() {
  const [value, setValue] = React.useState(0);

  const tripReportSection = <TripReportList />;
  const referenceSection = <ReferenceList />;
  const accommodationSection = <Button>accommodation</Button>;
  const foodSection = <Button>food</Button>;

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
        <SendRequest />
      </ProfileTabs>
      {section}
    </ProfileTabMenuBox>
  );
}
