import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  typography: {
    fontFamily: 'Roboto, Arial, sans-serif',
  },
  palette: {
    primary: {
      main: '#c1e8c4', 
    },
    secondary: {
      main: '#223634', 
    },
  },
});

export const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '400', 
  maxHeight: '90vh',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  overflowY: 'auto',
};
