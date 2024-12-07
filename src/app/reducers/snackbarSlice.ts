import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AlertColor } from '@mui/material/Alert';

interface SnackbarState {
  open: boolean;
  severity: AlertColor;
  message: string;
}

const initialState: SnackbarState = {
  open: false,
  severity: 'info',
  message: '',
};

const snackbarSlice = createSlice({
  name: 'snackbar',
  initialState,
  reducers: {
    openSnackbar: (state, action: PayloadAction<{ severity: AlertColor; message: string }>) => {
      state.open = true;
      state.severity = action.payload.severity;
      state.message = action.payload.message;
    },
    closeSnackbar: (state) => {
      state.open = false;
      state.message = '';
    },
  },
});

export const { openSnackbar, closeSnackbar } = snackbarSlice.actions;
export default snackbarSlice.reducer;
