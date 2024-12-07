import { ApolloQueryResult, useMutation, useQuery } from "@apollo/client";
import { Box, Button, CircularProgress, InputAdornment, MenuItem, Modal, TextField, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { modalStyle } from "../../theme";
import { CreateEmployeeSkillDocument, GetAllSkillQuery, GetAllSkillQueryVariables } from "../../graphql/person.generated";
import { CustomGraphQLError } from "../../types/apollo_client.types";
import { useDispatch } from "react-redux";
import { openSnackbar } from "../../app/reducers/snackbarSlice";

interface CreateEmployeeSkillValues {
  name: string
  description: string
}

interface AddEmployeeSkillProps {
  refetchSkill: (variables?: GetAllSkillQueryVariables) => Promise<ApolloQueryResult<GetAllSkillQuery>>;
}

const AddEmployeeSkill: React.FC<AddEmployeeSkillProps> = ({ refetchSkill }) => {
  const [createEmployeeSkill] = useMutation(CreateEmployeeSkillDocument)
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const handleOpenModal = () => { setOpenModal(true) }
  const handleCloseModal = () => { setOpenModal(false) }
  const [errorMsg, setErrorMsg] = useState("");
  const dispatch = useDispatch();

  const { handleSubmit, control, formState: { errors }, reset } = useForm<CreateEmployeeSkillValues>({
    defaultValues: {
      name: "",
      description: "",
    },
  });

  const handleAddEmployeeSkill: SubmitHandler<CreateEmployeeSkillValues> = async (data) => {
    setIsSubmitting(true)
    setErrorMsg("");
    try {
      await createEmployeeSkill({
        variables: {
          input: { name: data.name, description: data.description },
          requiresAuth: true
        }
      });
      dispatch(openSnackbar({severity: "success", message: "Berhasil Tambah Skill Pegawai"}))
      reset()
      refetchSkill()
      handleCloseModal()
    } catch (error: any) {
      let errCode = error?.graphQLErrors[0]?.code || "";
      if (errCode == "BAD_REQUEST") {
        let msg = error.original?.message || error.message || "";
        dispatch(openSnackbar({severity: "error", message: "Gagal Tambah Skill, pastikan nama skill belum pernah digunakan"}))
      }else{
        dispatch(openSnackbar({severity: "error", message: "Gagal Tambah Skill Pegawai"}))
      }
      console.log(error.graphQLErrors[0]);
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <>
      <Button variant="contained" color='secondary' style={{ marginBottom: "1rem" }}
        onClick={async () => {
          handleOpenModal()
        }}
      >Tambah Skill Pegawai</Button>


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
            name="description" control={control} rules={{ required: 'Name is required' }}
            render={({ field }) => (<TextField
              {...field}
              sx={{ width: "100%", mb: 1 }} label="Description" size='small' variant="outlined"
              error={!!errors.description} helperText={errors.description ? errors.description.message : ''}
            />)}
          />
          {/* FIELD END */}
          <Box component="section" sx={{ mb: 1, color: "red" }} >{errorMsg}</Box>
          <Box display="flex" justifyContent="space-between" alignItems="center">
            <Button
              onClick={handleCloseModal}
              variant="contained"
              color="info"
              disabled={isSubmitting}
            >
              Kembali
            </Button>
            <Button
              onClick={handleSubmit(handleAddEmployeeSkill)}
              variant="contained"
              color="primary"
              disabled={isSubmitting}
            >
              {isSubmitting ? (<CircularProgress size={24} sx={{ color: "white" }} />) : ("Tambah")}
            </Button>
          </Box>
        </Box>
      </Modal>
    </>
  )
}

export default AddEmployeeSkill;