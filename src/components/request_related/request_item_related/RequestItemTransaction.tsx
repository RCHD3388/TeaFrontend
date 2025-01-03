import { useSelector } from "react-redux";
import { RootState } from "../../../app/store";
import { Box, Button, TextField } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import AddIcon from '@mui/icons-material/Add';
import { useQuery } from "@apollo/client";
import { FindYourRequestItemTransactionDocument } from "../../../graphql/request_item.generated";
import { formatDateToLong, RequestStatusColors } from "../../../utils/service/FormatService";
import { CustomGraphQLError } from "../../../types/apollo_client.types";

export default function RequestItemTransaction() {
  const user = useSelector((state: RootState) => state.user);
  let { data, loading, error, refetch } = useQuery(FindYourRequestItemTransactionDocument, { variables: { requiresAuth: true } })

  const navigate = useNavigate();
  const [nameFilter, setNameFilter] = useState("")

  useEffect(() => {
    if (error) {
      navigate("/appuser/notfound")
    }
  }, [error])

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

        {!loading && data && data.findYourRequestItemTransaction.filter((req: any) => req.title.toLowerCase().includes(nameFilter.toLowerCase()))
          .map((requestItem: any, index: number) => {
            return (
              <div className="my-4 bg-white shadow-lg rounded-lg border border-gray-200" key={index}>
                <div className="p-4">
                  <h2 className="text-xl font-semibold text-gray-800 flex items-center">
                    {requestItem.title}
                    <span className={` ms-1 badge ${RequestStatusColors[requestItem.status as keyof typeof RequestStatusColors]}`}> {requestItem.status}</span>
                  </h2>
                  <div className="p-2">
                    <p className="mt-1 text-gray-700">
                      <span className="font-semibold">Tanggal pengajuan: </span>{formatDateToLong(requestItem.requested_at.toString())}
                    </p>
                    <p className="mt-0 text-gray-700">
                      <span className="font-semibold">Warehouse Asal: </span>
                      <span style={{ textTransform: "capitalize" }}>{requestItem.requested_from.name} ( {requestItem.requested_from.address} )</span>
                    </p>
                    <p className="mt-0 text-gray-700">
                      <span className="font-semibold">Warehouse Tujuan: </span>
                      <span style={{ textTransform: "capitalize" }}>{requestItem.requested_to.name} ( {requestItem.requested_to.address} )</span>
                    </p>
                  </div>
                </div>
                <div className="flex justify-end p-2 bg-gray-100 rounded-b-lg">
                  <Button variant="contained" color="info" onClick={() => {
                    navigate(`/appuser/request/item/${requestItem._id}`)
                  }}>Detail</Button>
                </div>
              </div>
            )
          })}
      </>
    </div>
  );
}