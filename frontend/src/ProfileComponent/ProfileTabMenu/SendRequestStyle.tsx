import { Box, Button, Dialog, DialogActions, DialogTitle, TextField } from '@material-ui/core';
import { DatePicker } from '@material-ui/pickers';
import styled from 'styled-components';

export const RequestButtonBox = styled(Box)`
  align-self: center;
`;

export const RequestDialog = styled(Dialog)`
  align-self: center;
  maxwidth: xs;
`;

export const SentRequestDialog = styled(Dialog)`
  align-self: center;
  maxwidth: xs;
`;

export const RequestDialogTitle = styled(DialogTitle)`
  align-self: center;
  text-align: center;
  padding: 25px;
  margin-left: 30px;
`;

export const RequestDialogBox = styled(Box)`
  padding: 25px;
  maxheight: 80%;
`;

export const RequestMessage = styled(TextField)``;

export const InputDate = styled(DatePicker)``;
export const DateBox = styled(Box)`
    display: flex
    justify-content: space-evenly
    padding: 25px;

`;

export const Error = styled.div`
  color: red;
  text-align: left;
  margin-top: 15px;
  margin-bottom: 15px;
`;

export const RequestDialogButton = styled(Button)``;

export const RequestDialogActions = styled(DialogActions)``;

export const RequestDialogForm = styled.form`
  text-align: right;
`;

export const RequestMutation = styled.div``;
