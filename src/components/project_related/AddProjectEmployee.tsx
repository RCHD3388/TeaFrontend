import { ApolloError, ApolloQueryResult, useMutation, useQuery } from "@apollo/client";
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import { Box, Button, CircularProgress, MenuItem, Modal, TextField, Typography } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { GetAllProjectEmployeesQuery, GetAllProjectEmployeesQueryVariables } from "../../graphql/project.generated";
import { modalStyle } from "../../theme";
import StickyHeadTable, { StickyHeadTableColumn } from "../global_features/StickyHeadTable";

interface RowData {
  _id: string,
  person: {
    name: string,
    email: string,
    address: string,
    phone_number: string
  },
  role: { _id: string, name: string },
  skill: [{ _id: string, name: string }]
}

interface AddProjectEmployeeProps {
  dataEmployee: any,
  loadingEmployee: boolean,
  errorEmployee: ApolloError | undefined,
  refetchEmployee: (variables?: GetAllProjectEmployeesQueryVariables) => Promise<ApolloQueryResult<GetAllProjectEmployeesQuery>>;
}



const AddProjectEmployee: React.FC<AddProjectEmployeeProps> = ({ dataEmployee, loadingEmployee, errorEmployee, refetchEmployee }) => {

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const handleOpenModal = () => { setOpenModal(true) }
  const handleCloseModal = () => { setOpenModal(false) }
  const dispatch = useDispatch();

  const [nameFilter, setNameFilter] = useState("")

  const [listTargetEmployee, setListTargetEmployee] = useState<string[]>([]);

  const columns: StickyHeadTableColumn<RowData>[] = [
    { id: 'person', label: "Pegawai", minWidth: 50, align: "center", format: (value) => String(value.name) },
    {
      id: 'role', label: 'Role', minWidth: 50, align: "center",
      renderComponent: (row) => { return (<div className="badge badge-neutral p-3 gap-2">{row.role.name}</div>) }
    },
    {
      id: 'skill', label: 'Skill', minWidth: 50, align: "center",
      renderComponent: (row) => {
        return (<div className="flex justify-center items-center">
          <Box sx={{ maxWidth: 200, overflowX: 'auto', display: 'flex', gap: 1 }}>
            {row.skill.map((skillname, index) => <div key={index} className="badge badge-neutral p-3 whitespace-nowrap gap-2">{skillname.name}</div>)}
          </Box>
        </div>)
      },
    },
    {
      id: 'action', label: 'Action', actionLabel: 'Detail', align: "center",
      buttonColor: (row) => { 
        if (listTargetEmployee.includes(row._id)) return "error"
        return "success"
      },
      buttonLabel: (row) => { 
        if (listTargetEmployee.includes(row._id)) return "Hapus"
        return "Tambah"
      }
    },
  ]

  const handleActionTable = (row: RowData, column: StickyHeadTableColumn<RowData>) => {
    let tempTargetEmployeeId = listTargetEmployee;
    if(listTargetEmployee.includes(row._id)){
      tempTargetEmployeeId = tempTargetEmployeeId.filter((id) => {return id != row._id})
    }else{
      tempTargetEmployeeId = [...tempTargetEmployeeId, row._id]
    }
    
    setListTargetEmployee(tempTargetEmployeeId)
    console.log(tempTargetEmployeeId)
  }

  useEffect(() => {setListTargetEmployee([])}, [])

  return (<>
    <Button variant="contained" color='secondary' style={{ marginBottom: "1rem" }}
      onClick={async () => {
        handleOpenModal()
      }}
      endIcon={<AddIcon />}
    >Tambah Pegawai Proyek</Button>

    <Modal
      open={openModal}
      onClose={handleCloseModal}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={() => {
        modalStyle.width = 700;
        return modalStyle
      }}>
        <Typography id="modal-modal-title" variant="h6" component="h2"><b>TAMBAH PEGAWAI BARU</b></Typography>
        <div>
          <StickyHeadTable
            columns={columns}
            rows={dataEmployee?.getAllProjectEmployees.unregistered.filter((emp: any) => emp.person.name.includes(nameFilter)) ?? []}
            withIndex={true}
            onActionClick={handleActionTable}
          />
        </div>
      </Box>
    </Modal>
  </>)
}

export default AddProjectEmployee;