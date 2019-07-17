import { Box, Paper } from '@material-ui/core';
import styled from 'styled-components';
import ProfileTabMenu from './ProfileTabMenu/ProfileTabMenu';
import ProfileUserDescription from './ProfileUserDescription/ProfileUserDescription';

export const StyledUserDescription = styled(ProfileUserDescription)``;

export const StyledTabMenu = styled(ProfileTabMenu)`
  padding: 20px;
`;

export const ProfileBox = styled(Box)`
    margin-top: -70px
    display: flex
    justify-content: center
`;

export const ProfileBackgroundPaper = styled(Paper)`
    margin-top: 150px
    height: 100px
`;
