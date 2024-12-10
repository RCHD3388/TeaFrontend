import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import EmployeeMainData from './EmployeeMainData';
import EmployeeSkillData from './EmployeeSkillData';
import { a11yProps, CustomTabPanel } from '../../../components/CustomTabPanel';



const EmployeePage: React.FC = () => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <div className="p-5" style={{ height: "100%" }}>
      <div className="flex flex-col" style={{ maxHeight: "100%" }}>
        <div className="text-4xl font-bold mb-2">{value === 0 ? "Data Pegawai Perusahaan" : "Data Skill Pegawai Perusahaan"}</div>
        <Box sx={{ width: '100%' }}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider', top: "0%", backgroundColor: "white"}}>
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
            <EmployeeMainData />
          </CustomTabPanel>
          <CustomTabPanel value={value} index={1}>
            <EmployeeSkillData />
          </CustomTabPanel>
        </Box>
      </div>
    </div>
  );
}
export default EmployeePage;