import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import PurchaseorderData from './PurchaseorderData';

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

const PembelianPage: React.FC = () => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Box
        sx={{
          borderBottom: 1,
          borderColor: 'divider',
          position: 'sticky',
          top: '0%',
          backgroundColor: 'white',
          mx: 2,
          my: 2,
        }}>
        <div className='text-4xl font-bold mb-2'>Purchase Order</div>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label='basic tabs example'
          indicatorColor='secondary'>
          <Tab
            label='Purchase Order'
            {...a11yProps(0)}
            sx={{
              color: value === 0 ? 'secondary.main' : 'inherit',
              '&.Mui-selected': { color: 'secondary.main' },
            }}
          />
          <Tab
            label='Purchase Transaction'
            {...a11yProps(1)}
            sx={{
              color: value === 1 ? 'secondary.main' : 'inherit',
              '&.Mui-selected': { color: 'secondary.main' },
            }}
          />
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
        <PurchaseorderData></PurchaseorderData>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        <div>awookaw</div>
      </CustomTabPanel>
    </Box>
  );
};
export default PembelianPage;
