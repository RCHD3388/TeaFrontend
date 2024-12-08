import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import { useNavigate, useParams } from 'react-router-dom';
import * as React from 'react';
import MaterialSection from './MaterialSection';
interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role='tabpanel'
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}>
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}
const InventoryPage: React.FC = () => {
  const navigate = useNavigate();
  const [value, setValue] = React.useState(0);
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  return (
    <Box sx={{ width: '100%', p: 5 }}>
      <Box sx={{ display: 'flex', gap: 2 }}>
        <h1 className='text-3xl font-bold'>Data Inventory</h1>
      </Box>
      <Box
        sx={{
          borderBottom: 1,
          borderColor: 'divider',
          position: 'sticky',
          top: '0%',
          backgroundColor: 'white',
        }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label='basic tabs example'
          indicatorColor='secondary'>
          <Tab
            label='Gudang'
            {...a11yProps(0)}
            sx={{
              color: value === 0 ? 'secondary.main' : 'inherit',
              '&.Mui-selected': { color: 'secondary.main' },
            }}
          />
          <Tab
            label='Material'
            {...a11yProps(1)}
            sx={{
              color: value === 1 ? 'secondary.main' : 'inherit',
              '&.Mui-selected': { color: 'secondary.main' },
            }}
          />
          <Tab
            label='Peralatan'
            {...a11yProps(3)}
            sx={{
              color: value === 1 ? 'secondary.main' : 'inherit',
              '&.Mui-selected': { color: 'secondary.main' },
            }}
          />
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
        <h1>awok</h1>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        <MaterialSection></MaterialSection>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={2}>
        <h1>awokasd</h1>
      </CustomTabPanel>
    </Box>
  );
};

export default InventoryPage;
