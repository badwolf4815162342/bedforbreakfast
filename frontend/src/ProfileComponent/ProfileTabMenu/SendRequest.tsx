import Button from '@material-ui/core/Button';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import React from 'react';
import {
  DateBox,
  InputDate,
  RequestButtonBox,
  RequestDialog,
  RequestDialogBox,
  RequestDialogTitle,
  RequestMessage,
} from './SendRequestStyle';

export default function SendRequest() {
  const [open, setOpen] = React.useState(false);
  const [sentOpen, setSentOpen] = React.useState(false);
  const [canRequest, setCanRequest] = React.useState(true);
  const [from, setFrom] = React.useState(new Date());
  const [to, setTo] = React.useState(new Date());

  function handleClickOpen() {
    setOpen(true);
  }

  function handleClose() {
    setOpen(false);
  }

  function handleSend() {
    setOpen(false);
    setCanRequest(false);
    setSentOpen(true);
  }

  function handleSentClose() {
    setSentOpen(false);
  }

  return (
    <RequestButtonBox>
      <Button variant="contained" color="secondary" onClick={handleClickOpen} disabled={!canRequest}>
        request
      </Button>
      <RequestDialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title" fullWidth>
        <RequestDialogBox>
          <RequestDialogTitle id="form-dialog-title">Send a request to stay with </RequestDialogTitle>
          <DialogContent>
            <DateBox>
              <InputDate
                value={from}
                onChange={(date) => {
                  if (date) {
                    setFrom(date.toDate());
                  }
                }}
                format="DD.MM.YYYY"
                disablePast
                label="From"
              />
              <InputDate
                value={to}
                onChange={(date) => {
                  if (date) {
                    setTo(date.toDate());
                  }
                }}
                format="DD.MM.YYYY"
                disablePast
                label="To"
              />
            </DateBox>
            <RequestMessage
              id="message"
              label="Describe the purpose your trip"
              color="secondary"
              multiline={true}
              rowsMax="15"
              fullWidth
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="secondary">
              Cancel
            </Button>
            <Button variant="contained" onClick={handleSend} color="secondary">
              Send
            </Button>
          </DialogActions>
        </RequestDialogBox>
      </RequestDialog>
      <RequestDialog open={sentOpen} onClose={handleSentClose} aria-labelledby="form-dialog-title" fullWidth>
        <RequestDialogBox>
          <RequestDialogTitle id="form-dialog-title">Your request has been sent!</RequestDialogTitle>
          <DialogContent>Now you can look for tickets for these dates on our partner's website!</DialogContent>
          <DialogActions>
            <Button onClick={handleSentClose} color="secondary">
              Close
            </Button>
            <Button variant="contained" onClick={handleSentClose} color="secondary">
              Look for tickets
            </Button>
          </DialogActions>
        </RequestDialogBox>
      </RequestDialog>
    </RequestButtonBox>
  );
}
