import { Box, Button, IconButton, Tab, Tabs } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../../app/store";
import { selectUser } from "../../../app/reducers/userSlice";
import { useQuery } from "@apollo/client";
import { FindProjectByIdDocument } from "../../../graphql/project.generated";
import ReplyAllIcon from '@mui/icons-material/ReplyAll';
import { theme } from "../../../theme";
import { a11yProps, CustomTabPanel } from "../../../components/CustomTabPanel";
import React, { useEffect } from "react";
import MainDetailProject from "./ProjectDetailRelated/MainDetailProject";
import DetailEmployeeProject from "./ProjectDetailRelated/DetailEmployeeProject";
import { CustomGraphQLError } from "../../../types/apollo_client.types";
import DetailInventoryItem from "../../../components/inventory_related/DetailInventoryItem";
import AttendanceProjectEmployee from "./ProjectDetailRelated/AttendanceProjectEmployee";


export default function DetailProject() {
  const { projectId } = useParams()
  const { data, loading, error, refetch } = useQuery(FindProjectByIdDocument, { variables: { id: projectId, requiresAuth: true } })
  const user = useSelector((state: RootState) => selectUser(state))
  const navigate = useNavigate()
  const getProject = () => { return data.findProjectById }

  const [value, setValue] = React.useState(0);
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  useEffect(() => {
    if (error) {
      // let graphqlErrorFetch = error?.graphQLErrors[0] as CustomGraphQLError || null;
      // if (graphqlErrorFetch?.original?.statusCode == "404") {
      //   navigate("/appuser/notfound")
      // }
      navigate("/appuser/notfound")
    }
  }, [error])

  return (
    <div className="p-5" style={{ height: "100%" }}>
      <div className="flex flex-col" style={{ maxHeight: "100%" }}>
        {/* page header title */}
        {!loading && !error && <>
          <Box display={"flex"}>
            <IconButton
              style={{ backgroundColor: theme.palette.secondary.main, height: 40, width: 40, borderRadius: 8, color: 'white' }}
              sx={{ mr: 1 }}
              onClick={() => { navigate(-1) }}
            >
              <ReplyAllIcon fontSize="medium"></ReplyAllIcon>
            </IconButton>
            <div className="text-4xl font-bold mb-2">Detail {getProject().name}</div>
          </Box>

          {/* TAB CONTENT START*/}
          <Box sx={{ width: '100%' }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider', top: "0%", backgroundColor: "white" }}>
              <Tabs value={value} onChange={handleChange} aria-label="basic tabs example" indicatorColor='secondary' variant="scrollable">
                <Tab label="Detail Proyek" {...a11yProps(0)} sx={{
                  color: value === 0 ? 'secondary.main' : 'inherit',
                  '&.Mui-selected': { color: 'secondary.main' },
                }} />
                <Tab label="Daftar Pegawai" {...a11yProps(1)} sx={{
                  color: value === 1 ? 'secondary.main' : 'inherit',
                  '&.Mui-selected': { color: 'secondary.main' },
                }} />
                <Tab label="Absensi Pegawai" {...a11yProps(1)} sx={{
                  color: value === 2 ? 'secondary.main' : 'inherit',
                  '&.Mui-selected': { color: 'secondary.main' },
                }} />
                <Tab label="Inventori Proyek" {...a11yProps(1)} sx={{
                  color: value === 3 ? 'secondary.main' : 'inherit',
                  '&.Mui-selected': { color: 'secondary.main' },
                }} />
                <Tab label="Pengeluaran Proyek" {...a11yProps(1)} sx={{
                  color: value === 4 ? 'secondary.main' : 'inherit',
                  '&.Mui-selected': { color: 'secondary.main' },
                }} />
              </Tabs>
            </Box>
            <CustomTabPanel value={value} index={0}>
              <MainDetailProject
                dataProject={data}
                refetchDetailProject={refetch}
                loadingProject={loading} errorProject={error}
              />
            </CustomTabPanel>
            <CustomTabPanel value={value} index={1}>
              <DetailEmployeeProject
                dataProject={data}
                refetchDetailProject={refetch}
                loadingProject={loading} errorProject={error}
              />
            </CustomTabPanel>
            <CustomTabPanel value={value} index={2}>
              <AttendanceProjectEmployee projectId={data.findProjectById._id || ""}/>
            </CustomTabPanel>
            <CustomTabPanel value={value} index={3}>
              <DetailInventoryItem warehouseId={data.findProjectById?.warehouse || ""}/>
            </CustomTabPanel>
            <CustomTabPanel value={value} index={4}>
              Pengeluaran
            </CustomTabPanel>
          </Box>

          {/* TAB CONTENT END */}
        </>}
      </div>
    </div>
  );
}