import React from 'react';

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
import { Link, Redirect } from 'react-router-dom';
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

export function Navbar() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
  const [searchString, setSearchString] = React.useState('');
  const [enter, setEnter] = React.useState(false);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  function handleProfileMenuOpen(event: any) {
    setAnchorEl(event.currentTarget);
  }

  function handleMobileMenuClose() {
    setMobileMoreAnchorEl(null);
  }

  function handleMenuClose() {
    setAnchorEl(null);
    handleMobileMenuClose();
  }

  function handleMobileMenuOpen(event: any) {
    setMobileMoreAnchorEl(event.currentTarget);
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
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <HeaderLink to="/profile">
        <MenuItem onClick={handleMenuClose} href="/profile">
          Profile
        </MenuItem>
      </HeaderLink>
      <HeaderLink to="/createAccommodation">
        <MenuItem onClick={handleMenuClose} href="/createAccommodation">
          Create an accommodation here
        </MenuItem>
      </HeaderLink>
    </Menu>
  );

  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
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
            <IconButton aria-label="Show 4 new mails" color="inherit">
              <Badge badgeContent={4} color="secondary">
                <MailIcon />
              </Badge>
            </IconButton>
            <IconButton aria-label="Show 17 new notifications" color="inherit">
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
    </Grow>
  );
}
