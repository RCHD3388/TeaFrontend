import { useSelector } from "react-redux";
import { RootState } from "../../../app/store";
import { Box, Button, TextField } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import AddIcon from '@mui/icons-material/Add';

export default function RequestItemTransaction() {
  const user = useSelector((state: RootState) => state.user);
  // let { data, loading, error, refetch } = useQuery(FindAllRequestCostsDocument, { variables: { requiresAuth: true } })

  const navigate = useNavigate();
  const [nameFilter, setNameFilter] = useState("")

  return (
    <div className="flex flex-col" style={{ maxHeight: "100%" }}>
      <>
        <div className="flex justify-end">
          <Button variant="contained" color="secondary"
            onClick={() => { navigate("/appuser/request/add_request_item") }}
            style={{ marginBottom: "1rem" }}
            endIcon={<AddIcon />}
          >
            Pengajuan perpindahan barang
          </Button>
        </div>

        <TextField
          color="secondary" sx={{ mb: 1, mr: 1 }} label="Pencarian" size='small' variant="outlined"
          onChange={(e) => { setNameFilter(e.target.value) }}
          slotProps={{
            input: {
              startAdornment: <SearchIcon></SearchIcon>,
            },
          }}
        />
      </>
    </div>
  );
}