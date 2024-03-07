import { useDispatch } from 'react-redux';
import { useAppSelector } from '../../hooks/redux-hooks';
import { hideNotification } from '../../slices/notificationSlice';
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import { Snackbar, Stack } from '@mui/material';
import React from 'react';

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const Notification = () => {
  const dispatch = useDispatch();
  const { open, message, type } = useAppSelector((state) => state.notification);

  const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    event?.preventDefault();

    if (reason === 'clickaway') {
      return;
    }

    dispatch(hideNotification());
  };

  return (
    <Stack spacing={2} sx={{ width: '100%' }}>
      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert onClose={handleClose} severity={type} sx={{ width: '100%' }}>
          {message}
        </Alert>
      </Snackbar>
    </Stack>
  );
};

export default Notification;
