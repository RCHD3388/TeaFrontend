import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import EmployeeMainData from './EmployeeMainData';
import EmployeeSkillData from './EmployeeSkillData';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
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

const EmployeePage: React.FC = () => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider', position: "sticky", top: "0%", backgroundColor: "white"}}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example" indicatorColor='secondary'>
          <Tab label="Data Pegawai" {...a11yProps(0)} sx={{
            color: value === 0 ? 'secondary.main' : 'inherit',
            '&.Mui-selected': { color: 'secondary.main' },
          }} />
          <Tab label="Data Skill" {...a11yProps(1)} sx={{
            color: value === 1 ? 'secondary.main' : 'inherit',
            '&.Mui-selected': { color: 'secondary.main' },
          }} />
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
        <EmployeeMainData/>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        <EmployeeSkillData/>
      </CustomTabPanel>
    </Box>
  );
}
export default EmployeePage;