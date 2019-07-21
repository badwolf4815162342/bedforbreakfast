import React from 'react';
import {
  AuthorPic,
  AuthorPicBox,
  ButtonContainer,
  ContactContainer,
  DescriptionContainer,
  HeaderLink,
  RequestCard,
  RequestContainer,
} from './RequestStyle';

// import {} from './RequestStyle';
import { Icon, IconButton } from '@material-ui/core';
import Moment from 'react-moment';

const Request: React.FC<{
  start: string;
  end: string;
  description: string;
  proposer: {
    _id: string;
    firstName: string;
    lastName: string;
    profilePicture: string;
    email: string;
    phoneNumber: string;
  };
  onAccept: (accepted: boolean) => void;
}> = ({
  start,
  end,
  description,
  proposer: { _id, firstName, lastName, profilePicture, email, phoneNumber },
  onAccept,
}) => {
  return (
    <RequestCard>
      <RequestContainer>
        <HeaderLink to={`/profile/${_id}`}>
          {firstName} {lastName}
        </HeaderLink>{' '}
        would like to visit for{' '}
        <Moment from={start} ago>
          {end}
        </Moment>{' '}
        from <Moment format={'MMMM Do'}>{start}</Moment>
      </RequestContainer>
      <AuthorPicBox>
        <HeaderLink to={`/profile/${_id}`}>
          <AuthorPic>
            <img src={profilePicture} style={{ width: 65, height: 65, borderRadius: 180 }} alt="Card" />
          </AuthorPic>
        </HeaderLink>
      </AuthorPicBox>
      <ButtonContainer>
        <IconButton color="secondary" onClick={() => onAccept(true)}>
          <Icon>check</Icon>
        </IconButton>
        <IconButton color="default" onClick={() => onAccept(false)}>
          <Icon>close</Icon>
        </IconButton>
      </ButtonContainer>
      <DescriptionContainer>
        <b>Message to host:</b> {description}
      </DescriptionContainer>
      <ContactContainer>
        <p>
          <b>Email:</b> {email}
        </p>
        <p>
          <b>Phone:</b> {phoneNumber}
        </p>
      </ContactContainer>
    </RequestCard>
  );
};

export default Request;
