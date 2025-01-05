import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AlertColor } from '@mui/material/Alert';

export interface PageTabState {
  page: { name: string, value: number}[]
}

const initialState: PageTabState = {
  page: [
    { name: 'request_page', value: 0 },
    { name: 'approval_page', value: 0 },
    { name: 'purchasing_page', value: 0 },
    { name: 'project_main_page', value: 0 },
  ]
};

const pageTabSlice = createSlice({
  name: 'snackbar',
  initialState,
  reducers: {
    setPageValueByName: (state, action: PayloadAction<{ name: string, value: number }>) => {
      const { name, value } = action.payload;
      const index = state.page.findIndex(p => p.name === name);
      if (index !== -1) {
        state.page[index].value = value;
      }
    },
  },
});

export const { setPageValueByName } = pageTabSlice.actions;
export default pageTabSlice.reducer;
