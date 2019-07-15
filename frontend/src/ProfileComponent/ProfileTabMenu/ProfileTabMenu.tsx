import { Button, Tab } from '@material-ui/core';
import React from 'react';
import { ProfileTabMenuBox, ProfileTabs } from './ProfileTabMenuStyle';
import TripReport from './ProfileTripReports/TripReport/TripReport';

export default function ProfileTabMenu() {
  const [value, setValue] = React.useState(0);

  function handleChange(event: React.ChangeEvent<{}>, newValue: number) {
    setValue(newValue);
  }

  return (
    <ProfileTabMenuBox>
      <ProfileTabs value={value} onChange={handleChange}>
        <Tab label="Trip reports" />
        <Tab label="References" />
        <Tab label="Accommodation" />
        <Tab label="Food" />
        <Button variant="contained" color="secondary">
          Request
        </Button>
      </ProfileTabs>
      {value}
      <TripReport
        role={'accommodation'}
        name={'Nuria A'}
        homeTown={'Madrid'}
        homeCountry={'Spain'}
        date={'May, 2019, 4 days'}
        //text={'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'}
        text={'Lorem ipsum dolor'}
        likeCount={210}
        liked={true}
      />
    </ProfileTabMenuBox>
  );
}
