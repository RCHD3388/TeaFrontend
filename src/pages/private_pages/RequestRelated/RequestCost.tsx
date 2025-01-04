import { useSelector } from "react-redux";
import { RootState } from "../../../app/store";
import AddRequestCost from "../../../components/request_related/request_cost_related/AddRequestCost";
import { FindAllRequestCostsDocument } from "../../../graphql/request_cost.generated";
import { useQuery } from "@apollo/client";
import { formatCurrency, formatDateToLong, RequestStatusColors } from "../../../utils/service/FormatService";
import { Box, Button, TextField } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import { useNavigate } from "react-router-dom";
import { useState } from "react";

interface RequestCostProps {
  request_page: boolean
}

export default function RequestCost({ request_page }: RequestCostProps) {
  const user = useSelector((state: RootState) => state.user);
  let { data, loading, error, refetch } = useQuery(FindAllRequestCostsDocument, { variables: { requiresAuth: true } })

  const navigate = useNavigate();
  const [nameFilter, setNameFilter] = useState("")

  return (
    <div className="flex flex-col" style={{ maxHeight: "100%" }}>
      <>
        {request_page && <div className="flex justify-end"><AddRequestCost refetchRequestCost={refetch} /></div>}

        <TextField
          color="secondary" sx={{ mb: 1, mr: 1 }} label="Pencarian" size='small' variant="outlined"
          onChange={(e) => { setNameFilter(e.target.value) }}
          slotProps={{
            input: {
              startAdornment: <SearchIcon></SearchIcon>,
            },
          }}
        />
        <Box maxHeight={800} overflow={"auto"}>
          {!loading && data && data.findAllRequestCosts.filter((req: any) => req.title.toLowerCase().includes(nameFilter.toLowerCase()))
            .map((requestCost: any, index: number) => {
              return (
                <div className="my-4 bg-white shadow-lg rounded-lg border border-gray-200" key={index}>
                  <div className="p-4">
                    <h2 className="text-xl font-semibold text-gray-800 flex items-center">
                      {requestCost.title}
                      <span className={` ms-1 badge ${RequestStatusColors[requestCost.status as keyof typeof RequestStatusColors]}`}> {requestCost.status}</span>
                    </h2>
                    <div className="p-2">
                      <p className="mt-1 text-gray-700">
                        <span className="font-semibold">Tanggal pengajuan: </span>{formatDateToLong(requestCost.requested_at.toString())}
                      </p>
                      <p className="mt-0 text-gray-700">
                        <span className="font-semibold">Proyek Asal: </span>
                        <span style={{ textTransform: "capitalize" }}>{requestCost.requested_from.name} ( {formatDateToLong(requestCost.requested_from.createdAt.toString())} )</span>
                      </p>
                    </div>
                  </div>
                  <div className="flex justify-end p-2 bg-gray-100 rounded-b-lg">
                    <Button variant="contained" color="info" onClick={() => {
                      navigate(`/appuser/request/cost/${requestCost._id}`)
                    }}>Detail</Button>
                  </div>
                </div>
              )
            })}
        </Box>
      </>

    </div>
  );
}