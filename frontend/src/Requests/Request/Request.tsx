import React from 'react';

import { Icon, IconButton, Paper } from '@material-ui/core';
import Moment from 'react-moment';

const Request: React.FC<{
  start: string;
  end: string;
  description: string;
  proposer: { firstName: string; lastName: string };
  onAccept: (accepted: boolean) => void;
}> = ({ start, end, description, proposer: { firstName, lastName }, onAccept }) => {
  return (
    <Paper>
      {firstName} {lastName} would like to visit for{' '}
      <Moment from={start} ago>
        {end}
      </Moment>{' '}
      from <Moment format={'MMMM Do'}>{start}</Moment>
      <IconButton color="secondary" onClick={() => onAccept(true)}>
        <Icon>check</Icon>
      </IconButton>
      <IconButton color="default" onClick={() => onAccept(false)}>
        <Icon>close</Icon>
      </IconButton>
    </Paper>
  );
};

export default Request;
