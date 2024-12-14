import { ApolloError, ApolloQueryResult, useMutation, useQuery } from "@apollo/client";
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import { Box, Button, CircularProgress, MenuItem, Modal, TextField, Typography } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { AddNewProjectEmployeeDocument, GetAllProjectEmployeesQuery, GetAllProjectEmployeesQueryVariables } from "../../graphql/project.generated";
import { modalStyle } from "../../theme";
import StickyHeadTable, { StickyHeadTableColumn } from "../global_features/StickyHeadTable";
import { openSnackbar } from "../../app/reducers/snackbarSlice";

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
  projectId: string,
  dataEmployee: any,
  loadingEmployee: boolean,
  errorEmployee: ApolloError | undefined,
  refetchEmployee: (variables?: GetAllProjectEmployeesQueryVariables) => Promise<ApolloQueryResult<GetAllProjectEmployeesQuery>>;
}



const AddProjectEmployee: React.FC<AddProjectEmployeeProps> = ({ projectId, dataEmployee, loadingEmployee, errorEmployee, refetchEmployee }) => {
  const [addNewEmployeeProject] = useMutation(AddNewProjectEmployeeDocument);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const handleOpenModal = () => { setOpenModal(true) }
  const handleCloseModal = () => { setOpenModal(false) }
  const dispatch = useDispatch();

  const [nameFilter, setNameFilter] = useState("")
  const [isConfirmation, setIsConfirmation] = useState(false);
  const [isDataEmpty, setIsDataEmpty] = useState(false)
  const [listTargetEmployee, setListTargetEmployee] = useState<string[]>([]);


  const columns: StickyHeadTableColumn<RowData>[] = [
    { id: 'person', label: "Pegawai", minWidth: 50, align: "center", format: (value) => String(value.name) },
    {
      id: 'role', label: 'Role', minWidth: 50, align: "center",
      renderComponent: (row) => { return (<div className="badge whitespace-nowrap badge-neutral p-3 gap-2">{row.role.name}</div>) }
    },
    {
      id: 'skill', label: 'Skill', minWidth: 50, align: "center",
      renderComponent: (row) => {
        return (<div className="flex justify-center items-center">
          <Box sx={{ maxWidth: 200, overflowX: 'auto', display: 'flex', gap: 1 }}>
            {row.skill.map((skillname, index) => <div key={index} className="badge whitespace-nowrap badge-neutral p-3 whitespace-nowrap gap-2">{skillname.name}</div>)}
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
        if (listTargetEmployee.includes(row._id)) return "Batal"
        return "Tambah"
      }
    },
  ]

  const handleActionTable = (row: RowData, column: StickyHeadTableColumn<RowData>) => {
    let tempTargetEmployeeId = listTargetEmployee;
    if (listTargetEmployee.includes(row._id)) {
      // delete employee from list
      tempTargetEmployeeId = tempTargetEmployeeId.filter((id) => { return id != row._id })
      if (isConfirmation && tempTargetEmployeeId.length == 0) {
        setIsConfirmation(false)
      }
    } else {
      // add employee to list
      tempTargetEmployeeId = [...tempTargetEmployeeId, row._id]
    }

    setListTargetEmployee(tempTargetEmployeeId)
  }

  const handleAddProjectEmployee = async () => {
    setIsDataEmpty(false)
    if (!isConfirmation) {
      if (listTargetEmployee.length == 0) {
        setIsDataEmpty(true)
      } else {
        setIsConfirmation(true)
      }
    } else {
      // add to proyek
      setIsSubmitting(true)
      try {
        await addNewEmployeeProject({
          variables: {
            id: projectId,
            employees: listTargetEmployee,
            requiresAuth: true
          }
        })
        dispatch(openSnackbar({ severity: "success", message: "Berhasil tambah pegawai pada proyek " }))
        setIsConfirmation(false)
        setListTargetEmployee([])
        refetchEmployee()
        handleCloseModal()
      } catch (err: any) {
        let error = err.graphQLErrors[0];
        if (error.code == "BAD_REQUEST") {
          let curError = error.original?.message || error.message;
          let msg = ""
          if (typeof curError == "string") msg = curError;
          if (typeof curError == "object") msg = curError[0];
          dispatch(openSnackbar({ severity: "error", message: msg }))
        } else {
          dispatch(openSnackbar({ severity: "error", message: "Gagal tambah pegawai proyek, silakan coba lagi nanti" }))
        }
      } finally {
        setIsSubmitting(false)
      }
    }
  }

  const handleCancelProject = () => {
    if (isConfirmation) {
      setIsConfirmation(false)
    } else {
      handleCloseModal()
    }
  }

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
        <Typography id="modal-modal-title" variant="h6" component="h2" sx={{ mb: 3 }}>
          {isConfirmation ? <b>KONFIRMASI PENAMBAHAN PEGAWAI BARU</b> : <b>TAMBAH PEGAWAI BARU</b>}
        </Typography>
        <div>
          {!isConfirmation && (<TextField
            color="secondary" sx={{ width: "100%", mb: 1 }} label="Pencarian" size='small' variant="outlined"
            onChange={(e) => {setNameFilter(e.target.value)}}
          />)}
          {isDataEmpty && <p className="text-error font-bold">Pilih data pegawai terlebih dahulu untuk ditambahkan pada proyek</p>}
          {isConfirmation && <p>Lakukan konfirmasi, pasikan data pegawai yang ingin anda tambahkan pada proyek tersebut telah sesuai dengan keinginan anda</p>}
          <StickyHeadTable
            tableSx={{ maxHeight: 300 }}
            columns={columns}
            rows={dataEmployee?.getAllProjectEmployees.unregistered.filter((emp: any) => {
              let customChecked = true;
              if (isConfirmation) customChecked = listTargetEmployee.includes(emp._id)
              return emp.person.name.includes(nameFilter) && customChecked
            }) ?? []}
            withIndex={true}
            onActionClick={handleActionTable}
          />
        </div>
        <Box display="flex" justifyContent="space-between" alignItems="center" sx={{ mt: 2 }}>
          <Button
            onClick={handleCancelProject}
            variant="contained"
            color="error"
            disabled={isSubmitting}
          >
            {isConfirmation ? "Kembali" : "Batalkan"}
          </Button>
          <Button
            onClick={() => { handleAddProjectEmployee() }}
            variant="contained"
            color="primary"
            disabled={isSubmitting}
          >
            {isSubmitting ? (<CircularProgress size={24} sx={{ color: "white" }} />) : isConfirmation ? "Tambahkan" : "Konfirmasi"}
          </Button>
        </Box>
      </Box>
    </Modal>
  </>)
}

export default AddProjectEmployee;