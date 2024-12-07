import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../app/store";
import { Alert, AlertColor, Snackbar } from "@mui/material";
import { closeSnackbar } from "../app/reducers/snackbarSlice";

interface CustomSnackBarProps {}

const CustomSnackBar: React.FC<CustomSnackBarProps> = () => {
  const dispatch = useDispatch();
  const { open, severity, message } = useSelector((state: RootState) => state.snackbar);

  const handleClose = () => {
    dispatch(closeSnackbar());
  };

  return (
    <Snackbar
      open={open}
      autoHideDuration={2000}
      onClose={() => { handleClose() }}
    >
      <Alert
        onClose={() => { handleClose() }}
        severity={severity}
        variant="filled"
        sx={{ width: '100%' }}
      >
        {message}
      </Alert>
    </Snackbar>
  )
}

export default CustomSnackBar;