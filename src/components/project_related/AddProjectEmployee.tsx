import { ApolloError, ApolloQueryResult, useMutation, useQuery } from "@apollo/client";
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import { Box, Button, CircularProgress, MenuItem, Modal, TextField, Typography } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import { useState } from "react";
import { useDispatch } from "react-redux";
import { GetAllProjectEmployeesQuery, GetAllProjectEmployeesQueryVariables } from "../../graphql/project.generated";


interface AddProjectEmployeeProps {
  dataEmployee: any,
  loadingEmployee: boolean,
  errorEmployee: ApolloError | undefined,
  refetchEmployee: (variables?: GetAllProjectEmployeesQueryVariables) => Promise<ApolloQueryResult<GetAllProjectEmployeesQuery>>;
}

const AddProjectEmployee: React.FC<AddProjectEmployeeProps> = ({dataEmployee, loadingEmployee, errorEmployee, refetchEmployee}) => {
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const handleOpenModal = () => { setOpenModal(true) }
  const handleCloseModal = () => { setOpenModal(false) }
  const dispatch = useDispatch();

  return (<>
    <Button variant="contained" color='secondary' style={{ marginBottom: "1rem" }}
      onClick={async () => {
        handleOpenModal()
      }}
      endIcon={<AddIcon />}
    >Tambah Pegawai Proyek</Button>

    
  </>)
}

export default AddProjectEmployee;