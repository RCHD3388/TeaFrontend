import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import {
  GetProjectQuery,
  GetProjectQueryVariables,
  GetProjectDocument,
} from '../../../graphql/project.generated';
import CircularProgress from '@mui/material/CircularProgress'; // Import CircularProgress for loading state
import Detailsection from './Detailsection';
import Employeesection from './Employeesection';

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

const Projectdetail: React.FC = () => {
  const [value, setValue] = React.useState(0);
  const { id } = useParams<{ id: string }>(); // Extract project id from URL parameters
  const { data, loading, error } = useQuery<
    GetProjectQuery,
    GetProjectQueryVariables
  >(GetProjectDocument, {
    variables: { id },
  });

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  const navigate = useNavigate();
  if (loading) {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
        }}>
        <CircularProgress /> {/* Display loading spinner */}
      </Box>
    );
  }

  if (error) {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
        }}>
        <h2>Error: {error.message}</h2> {/* Display error message */}
      </Box>
    );
  }
  return (
    <Box sx={{ width: '100%', p: 5 }}>
      <Box sx={{ display: 'flex', gap: 2 }}>
        <button onClick={() => navigate(-1)}>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            stroke-width='1.5'
            stroke='currentColor'
            class='size-6'>
            <path
              stroke-linecap='round'
              stroke-linejoin='round'
              d='M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 0 12h-3'
            />
          </svg>
        </button>
        <h1 className='text-3xl font-bold'>{data?.project.name}</h1>
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
            label='Detail'
            {...a11yProps(0)}
            sx={{
              color: value === 0 ? 'secondary.main' : 'inherit',
              '&.Mui-selected': { color: 'secondary.main' },
            }}
          />
          <Tab
            label='Pegawai'
            {...a11yProps(1)}
            sx={{
              color: value === 1 ? 'secondary.main' : 'inherit',
              '&.Mui-selected': { color: 'secondary.main' },
            }}
          />
          <Tab
            label='Inventory'
            {...a11yProps(3)}
            sx={{
              color: value === 1 ? 'secondary.main' : 'inherit',
              '&.Mui-selected': { color: 'secondary.main' },
            }}
          />
          <Tab
            label='Pengeluaran'
            {...a11yProps(4)}
            sx={{
              color: value === 1 ? 'secondary.main' : 'inherit',
              '&.Mui-selected': { color: 'secondary.main' },
            }}
          />
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
        <Detailsection data={data.project}></Detailsection>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        <Employeesection></Employeesection>
      </CustomTabPanel>
    </Box>
  );
};
export default Projectdetail;
