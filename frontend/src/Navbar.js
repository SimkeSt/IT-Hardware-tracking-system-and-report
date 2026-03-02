import React from 'react';
import { Link } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';

const Navbar = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => setAnchorEl(null);

  return (
    <AppBar position="static" sx={{ backgroundColor: '#1976d2' }}>
      <Toolbar>
        <IconButton
          edge="start"
          color="inherit"
          aria-label="menu"
          onClick={handleMenu}
          sx={{ mr: 2 }}
        >
          <MenuIcon />
        </IconButton>

        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Maloprodaja Dashboard
        </Typography>

        <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
          <MenuItem component={Link} to="/" onClick={handleClose}>
            Maloprodaja Grid
          </MenuItem>
          <MenuItem component={Link} to="/pivot" onClick={handleClose}>
            Pivot Grid
          </MenuItem>
          <MenuItem component={Link} to="/sifarnik" onClick={handleClose}>
            Šifarnik
          </MenuItem>
          <MenuItem component={Link} to="/GridSync" onClick={handleClose}>
            MaloprodajaGridSync
          </MenuItem>
          <MenuItem component={Link} to="/PivotGridSync" onClick={handleClose}>
            PivotGridSync
          </MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
