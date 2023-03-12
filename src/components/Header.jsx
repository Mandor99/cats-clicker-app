import React, { useState } from 'react'
import '../styles/header.css'
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import SideBar from './SideBar'
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import Slide from '@mui/material/Slide';
import CatForm from './CatForm';
import MenuIcon from '@mui/icons-material/Menu';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const Header = () => {
  const [dir, setDir] = useState({ left: false })
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => setOpen(true);

  const handleClose = () => setOpen(false);

  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setDir({ ...dir, [anchor]: open })
  }

  return (
    <header className='header'>
      <div className='header__slider'>
        <Button onClick={toggleDrawer('left', true)}><MenuIcon sx={{ color: '#000' }} fontSize='large' /></Button>
        <Drawer
          anchor={'left'}
          open={dir['left']}
          onClose={toggleDrawer('left', false)}
        >
          <Box
            sx={{ width: 250 }}
            role="presentation"
            onClick={toggleDrawer('left', false)}
            onKeyDown={toggleDrawer('left', false)}
          >
            <SideBar />
          </Box>
        </Drawer>
      </div>

      <h1 className='header__title capitalize'>cat clicker app</h1>

      <div>
        <div className='header__dialog'>
          <Button variant="outlined" onClick={handleClickOpen}>Edit</Button>
          <Dialog
            open={open}
            TransitionComponent={Transition}
            keepMounted
            onClose={handleClose}
            aria-describedby="alert-dialog-slide-description"
          >
            <DialogContent>
              <CatForm>
                <Button variant="contained" color="error" className="grow form__dialog--close" onClick={handleClose}>Undo</Button>
              </CatForm>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </header>
  )
}

export default Header