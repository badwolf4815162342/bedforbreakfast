import { Button, Tab, Tabs } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import React from 'react';
import { ProfileTabMenu } from './ProfileTabMenuStyle';

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
  },
});

export default function CenteredTabs() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  function handleChange(event: React.ChangeEvent<{}>, newValue: number) {
    setValue(newValue);
  }

  return (
    <ProfileTabMenu className={classes.root}>
      <Tabs value={value} onChange={handleChange} indicatorColor="secondary" textColor="secondary" centered>
        <Tab label="Trip reports" />
        <Tab label="References" />
        <Tab label="Accommodation" />
        <Tab label="Food" />
        <Button variant="contained" color="secondary">
          Request
        </Button>
      </Tabs>
    </ProfileTabMenu>
  );
}
