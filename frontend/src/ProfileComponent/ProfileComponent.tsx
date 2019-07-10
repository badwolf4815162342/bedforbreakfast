
import React from 'react';
import ProfileUserDescription from './ProfileUserDescription/ProfileUserDescription';
import User from './ProfileUserDescription/ProfileUserDescription';

class ProfileComponent extends React.Component<{ user: User }> {
  render() {
    return <ProfileUserDescription />;
  }
}
export default ProfileComponent;
