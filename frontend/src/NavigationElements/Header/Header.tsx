import AppBar from '@material-ui/core/AppBar';
import Badge from '@material-ui/core/Badge';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Toolbar from '@material-ui/core/Toolbar';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MailIcon from '@material-ui/icons/Mail';
import MoreIcon from '@material-ui/icons/MoreVert';
import NotificationsIcon from '@material-ui/icons/Notifications';
import SearchIcon from '@material-ui/icons/Search';
import React from 'react';
import { Link, Redirect } from 'react-router-dom';

import { AUTH_TOKEN, USER_ID } from '../../constants';
import {
  ContainerSearchIcon,
  Grow,
  HeaderLink,
  Search,
  SectionDesktop,
  SectionMobile,
  StyledInputBase,
  Title,
} from './HeaderStyle';
import NotificationList from './Notifications/NotificationList';

export function Navbar() {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [notificationAnchorEl, setNotificationAnchorEl] = React.useState<null | HTMLElement>(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState<null | HTMLElement>(null);
  const [searchString, setSearchString] = React.useState('');
  const [enter, setEnter] = React.useState(false);
  const loggedUserID = localStorage.getItem(USER_ID);
  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
  const isNotificationMenuOpen = Boolean(notificationAnchorEl);

  function handleProfileMenuOpen(event: React.MouseEvent<HTMLButtonElement | HTMLLIElement>) {
    setAnchorEl(event.currentTarget);
  }

  function handleMobileMenuOpen(event: React.MouseEvent<HTMLButtonElement>) {
    setMobileMoreAnchorEl(event.currentTarget);
  }

  function handleNotificationMenuOpen(event: React.MouseEvent<HTMLButtonElement>) {
    setNotificationAnchorEl(event.currentTarget);
  }

  function handleMenuClose() {
    setAnchorEl(null);
    handleMobileMenuClose();
  }

  function handleMobileMenuClose() {
    setMobileMoreAnchorEl(null);
  }

  function handleNotificationMenuClose() {
    setNotificationAnchorEl(null);
  }

  function handleKeyDown(e: any) {
    if (e.key === 'Enter') {
      setEnter(true);
    } else {
      setEnter(false);
    }
  }

  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      transformOrigin={{ vertical: 'top', horizontal: 'center' }}
      getContentAnchorEl={null}
      id={menuId}
      keepMounted
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      {loggedUserID && [
        <HeaderLink to={`/profile/${loggedUserID}`} key="1">
          <MenuItem onClick={handleMenuClose} href="/profile">
            Profile
          </MenuItem>
        </HeaderLink>,
        <HeaderLink to="/" key="2">
          <MenuItem
            onClick={() => {
              handleMenuClose();
              localStorage.removeItem(AUTH_TOKEN);
              localStorage.removeItem(USER_ID);
            }}
          >
            Logout
          </MenuItem>
        </HeaderLink>,
      ]}
      {!loggedUserID && (
        <HeaderLink to="/login">
          <MenuItem onClick={handleMenuClose}>Login</MenuItem>
        </HeaderLink>
      )}
    </Menu>
  );

  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      transformOrigin={{ vertical: 'top', horizontal: 'center' }}
      getContentAnchorEl={null}
      id={mobileMenuId}
      keepMounted
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem>
        <IconButton aria-label="Show 4 new mails" color="inherit">
          <Badge badgeContent={4} color="secondary">
            <MailIcon />
          </Badge>
        </IconButton>
        <p>Messages</p>
      </MenuItem>
      <MenuItem>
        <IconButton aria-label="Show 11 new notifications" color="inherit">
          <Badge badgeContent={11} color="secondary">
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <p>Notifications</p>
      </MenuItem>
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          aria-label="Account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
    </Menu>
  );

  const renderNotificationMenu = (
    <Menu
      anchorEl={notificationAnchorEl}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      transformOrigin={{ vertical: 'top', horizontal: 'center' }}
      getContentAnchorEl={null}
      keepMounted
      open={isNotificationMenuOpen}
      onClose={handleNotificationMenuClose}
    >
      {loggedUserID && <NotificationList onClick={handleNotificationMenuClose}></NotificationList>}
    </Menu>
  );

  return (
    <Grow>
      <AppBar position="static">
        <Toolbar>
          <Title>
            <HeaderLink to={'/'}>BedForBreakfast</HeaderLink>
          </Title>
          <Search>
            <Link
              to={{
                pathname: searchString ? `/searchResults/${searchString}` : '',
              }}
            >
              <ContainerSearchIcon>
                <SearchIcon />
              </ContainerSearchIcon>
            </Link>
            {enter && (
              <div>
                <Redirect
                  push
                  to={{
                    pathname: searchString ? `/searchResults/${searchString}` : '',
                  }}
                />
              </div>
            )}
            <StyledInputBase
              placeholder="Search…"
              onChange={(e) => {
                setSearchString(e.target.value);
              }}
              onKeyDown={handleKeyDown}
            />
          </Search>
          <Grow />
          <SectionDesktop>
            <IconButton aria-label="Show 17 new notifications" color="inherit" onClick={handleNotificationMenuOpen}>
              <Badge badgeContent={17} color="secondary">
                <NotificationsIcon />
              </Badge>
            </IconButton>
            <IconButton
              edge="end"
              aria-label="Account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
          </SectionDesktop>
          <SectionMobile>
            <IconButton
              aria-label="Show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </SectionMobile>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
      {renderNotificationMenu}
    </Grow>
  );
}
