import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import React from 'react';
import { RequestButtonBox } from './ProfileTabMenuStyle';

export default function SendRequest() {
  const [open, setOpen] = React.useState(false);

  function handleClickOpen() {
    setOpen(true);
  }

  function handleClose() {
    setOpen(false);
  }

  return (
    <RequestButtonBox>
      <Button variant="contained" color="secondary" onClick={handleClickOpen}>
        request
      </Button>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Here will be request fields</DialogTitle>
        <DialogContent>
          <DialogContentText>It's not finished yet</DialogContentText>
          <TextField autoFocus margin="dense" id="name" label="Describe your trip" color="secondary" fullWidth />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleClose} color="secondary">
            Send
          </Button>
        </DialogActions>
      </Dialog>
    </RequestButtonBox>
  );
}
