import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MoreIcon from '@mui/icons-material/MoreVert';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import { useNavigate } from 'react-router-dom';
import { useContext,useEffect } from 'react';
import { AuthContext } from '../Context/AuthContext';
import { makeStyles } from '@mui/styles';
import HomeIcon from '@mui/icons-material/Home';
import insta from "../Assets/instagram.png";
import ExploreIcon from '@mui/icons-material/Explore';
import Avatar from '@mui/material/Avatar';





const useStyles=makeStyles({
  appbar:{
    background:"#2f3542",

  }
})

export default function Navbar({userData}) {
 console.log(userData.fullName)
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

  const navigate=useNavigate()
  const {logout}=useContext(AuthContext)
  const classes=useStyles()

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };
  const handleProfile=()=>{
    navigate(`/profile/${userData.userId}`)
  }

  const handleLogout=async()=>{
     await logout()
     navigate("/login")
  }
  const handlebannerClick=()=>{
    navigate("/")
  }
  const handleExplore=()=>{
    let win=window.open('https://www.google.com','blank')
    win.focus()
  }
  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleProfile}><AccountCircle></AccountCircle><p>&nbsp; Profile</p></MenuItem>
      <MenuItem onClick={handleLogout}><ExitToAppIcon></ExitToAppIcon><p>&nbsp; Logout</p></MenuItem>
    </Menu>
  );

  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem onClick={handleProfile}><AccountCircle></AccountCircle><p>&nbsp; Profile</p></MenuItem>
      <MenuItem onClick={handlebannerClick}> <HomeIcon></HomeIcon><p>&nbsp; Home</p> </MenuItem>
      <MenuItem onClick={handleExplore}>  <ExploreIcon ></ ExploreIcon ><p>&nbsp; Explore</p> </MenuItem>
      <MenuItem onClick={handleLogout}><ExitToAppIcon></ExitToAppIcon><p>&nbsp; Logout</p></MenuItem>
    </Menu>
  );

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="fixed"  sx={{background:"white"}}>
        <Toolbar sx={{marginRight:"15rem"}} >
          <div style={{display:"flex",alignItems:"center",marginLeft:"6rem"}}>
            <img style={{width:"20vh"}} src={insta}></img>
          </div>
          
         
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: 'none', md: 'flex' },color:"black",alignItems:"center",marginRight:"4rem"}}>
           
            <HomeIcon sx={{marginRight:"1.8rem",cursor:"pointer"}} fontSize="medium" onClick={handlebannerClick}></HomeIcon>
          
           <ExploreIcon sx={{marginRight:"1.5rem",cursor:"pointer"}}fontSize="medium" onClick={handleExplore}><p>&npsp;Explore</p></ExploreIcon>
          
          
            <IconButton
              size="large"
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            
            >
            <Avatar src={userData.profileUrl} sx={{width:"3rem",height:"3rem"}}></Avatar>
            </IconButton>
          </Box>
          <Box sx={{ display: { xs: 'flex', md: 'none' }}}>
            <IconButton
              size="large"
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
             
            >
              <MoreIcon />
              <Avatar src={userData.profileUrl} sx={{width:"3rem",height:"3rem"}}></Avatar> 
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
    </Box>
  );
}
