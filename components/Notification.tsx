import React from 'react';
import Alert from '@mui/material/Alert';
import CloseIcon from '@mui/icons-material/Close';
import { IconButton, Collapse } from '@material-ui/core';

type Props = {
open: boolean;
  toggle: () => void
};

const Notification = (props: Props) => {
    var {open, toggle} = props;
  console.log(process.env.STYTCH_PUBLIC_TOKEN);

  return (
    <Collapse in={open}>
          
    <Alert
    action={
      <IconButton
        aria-label="close"
        color="inherit"
        size="small"
        onClick={toggle}
      >
        <CloseIcon fontSize="inherit" />
      </IconButton>
    }
    sx={{ mb: 2 }}
  >
    User was successfully <b> added </b>  - refresh the page.
  </Alert>
  </Collapse>
  );
};

export default Notification;
