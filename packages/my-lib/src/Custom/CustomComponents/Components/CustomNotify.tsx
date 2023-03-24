import * as React from "react";
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { useContext, useEffect } from "react";
import { DataContext, actions } from "../../../Context";
import MuiAlert, { AlertProps } from "@mui/material/Alert";

export interface message {
  success?: string;
  fail?: string;
  info?: string;
}

function CustomNotify(messages:any) {
  const { dispatch, state } = useContext(DataContext);
  const [openSuccess, setOpenSuccess] = React.useState(false);
  const [openFail, setOpenFail] = React.useState(false);
  const [openInfo, setOpenInfo] = React.useState(false);
  const [count, setCount] = React.useState(0);

  useEffect(() => {
    setCount((pre) => pre + 1);
    count > 1 && setOpenSuccess(true);
  }, [state.notify.success]);

  useEffect(() => {
    setCount((pre) => pre + 1);
    count > 1 && setOpenFail(true);
  }, [state.notify.fail]);
  useEffect(() => {
    setCount((pre) => pre + 1);
    count > 1 && setOpenInfo(true);
  }, [state.notify.info]);
  const handleClose = (
    event: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenSuccess(false);
    setOpenFail(false);
    setOpenInfo(false)
  };

  const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
    props,
    ref
  ) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

  const action = (
    <React.Fragment>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
  );

  return (
    <div>
      <Snackbar
        open={openSuccess}
        autoHideDuration={4000}
        onClose={handleClose}
        // message="Done Successfully..!!"
        action={action}
      >
        <Alert
          onClose={handleClose}
          severity="success"
          sx={{ width: "100%" }}
          action={action}
        >
          {messages.success ? messages.success : "Done Successfully...!!"}
        </Alert>
      </Snackbar>
      <Snackbar
        open={openFail}
        autoHideDuration={4000}
        onClose={handleClose}
        action={action}
      >
        <Alert
          onClose={handleClose}
          severity="error"
          sx={{ width: "100%" }}
          action={action}
        >
          {messages.fail ? messages.fail : "Error : Task Failed"}
        </Alert>
      </Snackbar>
      <Snackbar
        open={openInfo}
        autoHideDuration={4000}
        onClose={handleClose}
        action={action}
      >
        <Alert
          onClose={handleClose}
          severity="info"
          sx={{ width: "100%" }}
          action={action}
        >
          {messages.info ? messages.info : "You are informed"}
        </Alert>
      </Snackbar>
    </div>
  );
}

export default CustomNotify;
