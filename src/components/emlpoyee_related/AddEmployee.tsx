import { Box, Button, Modal, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";

const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

interface CreateEmployeeValues {
  name: string
  email: string
  phone_number: string
  address: string
  hire_date: string
  salary: number
  status: string
  role_id: string
  skill_id: string
}

interface AddEmployeeProps { }

const AddEmployee: React.FC<AddEmployeeProps> = ({ }) => {
  const [openModal, setOpenModal] = useState(false);
  const handleOpenModal = () => { setOpenModal(true) }
  const handleCloseModal = () => { setOpenModal(false) }

  const { handleSubmit, control, formState: { errors }, reset } = useForm<CreateEmployeeValues>({
    defaultValues: {
      name: "",
      email: "",
      phone_number: "",
      address: "",
      hire_date: "",
      salary: 0,
      status: "",
      role_id: "",
      skill_id: ""
    },
  });

  const handleAddEmployee: SubmitHandler<CreateEmployeeValues> = async (data) => {
    console.log("submit data")
  }

  return (
    <>
      <Button variant="contained" color='secondary' style={{ marginBottom: "1rem" }}
        onClick={() => { handleOpenModal() }}
      >Tambah Pegawai</Button>


      <Modal
        open={openModal}
        onClose={handleCloseModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={modalStyle}>
          <Typography id="modal-modal-title" variant="h6" component="h2"><b>TAMBAH PEGAWAI BARU</b></Typography>
          {/* FIELD START */}
          <Controller
            name="name" control={control} rules={{ required: 'Name is required' }}
            render={({ field }) => (<TextField
              {...field}
              sx={{ width: "100%", mb: 1 }} label="Name" size='small' variant="outlined"
              error={!!errors.name} helperText={errors.name ? errors.name.message : ''}
            />)}
          />
          <Controller
            name="email" control={control} rules={{ required: 'Email is required' }}
            render={({ field }) => (<TextField
              {...field}
              sx={{ width: "100%", mb: 1 }} label="Email" size='small' variant="outlined"
              error={!!errors.email} helperText={errors.email ? errors.email.message : ''}
            />)}
          />
          <Controller
            name="phone_number" control={control} rules={{ required: 'Phone is required' }}
            render={({ field }) => (<TextField
              {...field}
              sx={{ width: "100%", mb: 1 }} label="Phone" size='small' variant="outlined"
              error={!!errors.phone_number} helperText={errors.phone_number ? errors.phone_number.message : ''}
            />)}
          />
          <Controller
            name="address" control={control} rules={{ required: 'Address is required' }}
            render={({ field }) => (<TextField
              {...field}
              sx={{ width: "100%", mb: 1 }} label="Address" size='small' variant="outlined"
              error={!!errors.address} helperText={errors.address ? errors.address.message : ''}
            />)}
          />
          {/* FIELD END */}

          <Box display="flex" justifyContent="space-between" alignItems="center">
            <Button
              onClick={handleCloseModal}
              variant="contained"
              color="info"
              // disabled={loading || isSubmitting}
            >
              Kembali
            </Button>
            <Button
              onClick={handleSubmit(handleAddEmployee)}
              variant="contained"
              color="primary"
              // disabled={isSubmitting}
            >
              {/* {isSubmitting ? (<CircularProgress size={24} sx={{ color: "white" }} />) : ("Tambah")} */}
              Submit
            </Button>
          </Box>
        </Box>
      </Modal>
    </>
  )
}

export default AddEmployee;