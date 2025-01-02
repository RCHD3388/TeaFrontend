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
  maxWidth: "90%",
  width: 500,
  maxHeight: '90vh',
  bgcolor: 'background.paper',
  border: 'none', // Menghilangkan border untuk tampilan bersih
  borderRadius: 2, // Membuat sudut lebih bulat untuk nuansa premium
  boxShadow: '0px 10px 30px rgba(0, 0, 0, 0.15)', // Shadow lembut dengan kesan modern
  padding: 4, // Padding konsisten untuk ruang dalam yang nyaman
  overflowY: 'auto',
};
