import { ApolloQueryResult, useMutation } from "@apollo/client"
import { FindAllProjectsQuery, FindProjectByIdQueryVariables } from "../../../../graphql/project.generated"
import { Box, Button, Card, CardContent, Container, Stack, TextField, Typography } from "@mui/material"
import { formatCurrency, formatDateToLong } from "../../../../utils/service/FormatService"
import { useNavigate } from "react-router-dom"
import { useDispatch } from "react-redux"
import { setPageValueByName } from "../../../../app/reducers/pageTabSlice"
import RequestItemInput from "../../../../components/request_related/RequestItemInput"
import { itemDetail } from "../../../../types/staticData.types"
import { useEffect, useState } from "react"
import ProjectClosingMaterialInput from "./ProjectClosingMaterialInput"
import { UpdateProjectClosingDocument } from "../../../../graphql/project_closing.generated"
import { GetBadReqMsg } from "../../../../utils/helpers/ErrorMessageHelper"
import { openSnackbar } from "../../../../app/reducers/snackbarSlice"

interface ProjectClosingDetailProps {
  dataProject: any,
  refetchProject: (variables?: FindProjectByIdQueryVariables) => Promise<ApolloQueryResult<FindAllProjectsQuery>>,
}

const ProjectClosingDetail: React.FC<ProjectClosingDetailProps> = ({ dataProject, refetchProject }) => {
  const getData = () => {
    return dataProject?.findProjectById.project_closing
  }
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [updateProjectClosing] = useMutation(UpdateProjectClosingDocument)
  const [currentNote, setCurrentNote] = useState("")

  const handleUpdateNote = async () => {
    try {
      if (currentNote == getData()?.note) return
      await updateProjectClosing({
        variables: {
          updateProjectClosingInput: {
            note: currentNote
          },
          id: dataProject?.findProjectById._id,
          requiresAuth: true
        },
      })

      await refetchProject()
      dispatch(openSnackbar({ severity: "success", message: "Berhasil memperbarui data" }))
    } catch (err: any) {
      let msg = GetBadReqMsg("Gagal memperbarui data, silakan coba lagi nanti", err)
      dispatch(openSnackbar({ severity: "error", message: String(msg) }))
    }
  }

  useEffect(() => { if (dataProject) setCurrentNote(getData()?.note || "") }, [dataProject])

  const [itemDetail, setItemDetail] = useState<itemDetail[]>([])

  return (
    <Container>
      <div className="flex justify-end">
        <Button variant="contained" color="error" sx={{ mb: 2 }} onClick={() => { dispatch(setPageValueByName({ name: "project_main_page", value: 0 })) }}>Kembali</Button>
      </div>
      <Card>
        <CardContent>
          <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold' }}>Data Penyelesaian Proyek</Typography>
          <Box sx={{ p: 2 }}>
            <Stack direction="row" spacing={1} alignItems="center">
              <Typography variant="body1" sx={{ mr: 2 }}><b>Disetujui oleh:</b> {getData()?.closed_by?.person.name} ( {getData()?.closed_by?.person.email} )</Typography>
            </Stack>
            <Stack direction="row" spacing={1} alignItems="center">
              <Typography variant="body1" sx={{ mr: 2 }}><b>Disetujui pada:</b> {getData() ? formatDateToLong(getData()?.request_project_closing.handled_date) : ''}</Typography>
            </Stack>

            {/* NOTE UPDATE FIELD START */}
            <TextField value={currentNote} color="secondary"
              sx={{ width: "100%", my: 1 }} label="Deskripsi Penyelesaian" size='small' variant="outlined"
              onChange={(e) => { setCurrentNote(e.target.value) }}
            />
            <div className="flex justify-end">
              <Button variant="contained" color="secondary" onClick={() => { handleUpdateNote() }}>Perbarui</Button>
            </div>
            {/* NOTE UPDATE FIELD END */}

            <Typography variant="h6" sx={{ my: 2 }}><b>Dokumen Penyelesaian Proyek</b></Typography>
            <Box sx={{ pl: 2 }} display={"flex"} flexDirection={"column"}>
              <Stack direction="row" spacing={1} alignItems="center">
                {getData()?.document ? (
                  <Typography variant="body1" sx={{ mr: 2 }}>

                  </Typography>
                ) : (
                  <Typography variant="body1" sx={{ mr: 2 }} color="success">
                    <b>Dokumen sudah di upload. Anda dapat upload ulang dokumen jika dibutuhkan</b>
                  </Typography>
                )}
              </Stack>

              {/* FIELD DAN BUTTON UNTUK UPLOAD DAN DOWNLOAD */}

              {/* UNTUK FIELD PEMILIHAN FILE DISINI -- START*/}

              {/* UNTUK FIELD PEMILIHAN FILE DISINI -- END*/}

              <div className="flex">
                <Button
                  size='small'
                  variant="contained"
                  color="secondary" sx={{ mr: 1 }}
                  onClick={() => { navigate(`/appuser/request/closing/${getData()?.requested_from._id}`) }}
                >
                  Lihat Detail Proyek
                </Button>
                {!getData().document &&
                  <Button size='small' variant="contained" color="warning">
                    Download Dokumen
                  </Button>
                }
              </div>

              {/* FIELD DAN BUTTON UNTUK UPLOAD DAN DOWNLOAD */}
            </Box>

            <Typography variant="h6" sx={{ my: 2 }}><b>Total Penggunaan Material</b></Typography>
            <Box sx={{ pl: 2 }} display={"flex"} flexDirection={"column"}>
              {getData().material_used.length == 0 ?
                <>
                  <ProjectClosingMaterialInput
                    itemDetail={itemDetail}
                    setItemDetail={setItemDetail}
                    projectName={dataProject?.findProjectById.name}
                    projectId={dataProject?.findProjectById._id}
                    refetchProject={refetchProject}
                  />
                </> :
                <Container sx={{ p: 2 }}>
                  <table className="table table-xs border-2">
                    <thead className="bg-secondary text-white font-normal text-base" style={{ position: "sticky", top: 0, zIndex: 1 }}>
                      <tr>
                        <td align="left">Barang</td>
                        <td align="left">Merk</td>
                        <td align="left">Satuan</td>
                        <td align="right">Terpakai</td>
                        <td align="right">Harga</td>
                        <td align="right">Sub Total</td>
                        <th></th>
                      </tr>
                    </thead>
                    <tbody>
                      {getData().material_used.length > 0 ? getData().material_used.map((item: any, index: number) => (
                        <tr key={index}>
                          <td className="text-sm" align="left" style={{ whiteSpace: "nowrap", textOverflow: "ellipsis" }}>{item.material.name}</td>
                          <td className="text-sm" align="left">{item.material.merk.name}</td>
                          <td className="text-sm" align="left">{item.material.unit_measure.name} ( {item.material.conversion} x {item.material.minimum_unit_measure.name} )</td>
                          <td className="text-sm" align="right">{item.remain}</td>
                          <td className="text-sm" align="right">{formatCurrency(item.price)}</td>
                          <td className="text-sm" align="right">{formatCurrency(item.price * item.remain)}</td>
                        </tr>
                      )) : <tr className="p-4"><td colSpan={4} className="p-4 text-sm" style={{ textAlign: "center" }}>Tidak terdapat material sisa.</td></tr>}
                    </tbody>
                  </table>
                  <div className="flex justify-end">
                    <Typography variant="body1" sx={{ mr: 2 }}>
                      <b>Total:</b> {formatCurrency(getData().material_used.reduce((acc: number, item: any) => acc + (item.price * item.remain), 0))}
                    </Typography>
                  </div>
                </Container>}
            </Box>
          </Box>
        </CardContent>
      </Card>
    </Container>
  )
}

export default ProjectClosingDetail