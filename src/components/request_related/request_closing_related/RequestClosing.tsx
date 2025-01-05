import { useSelector } from "react-redux";
import { RootState } from "../../../app/store";
import { Box, Button, TextField } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import AddIcon from '@mui/icons-material/Add';
import { DocumentNode, useQuery } from "@apollo/client";
import { FindYourRequestItemTransactionDocument } from "../../../graphql/request_item.generated";
import { formatDateToLong, RequestStatusColors } from "../../../utils/service/FormatService";
import { CustomGraphQLError } from "../../../types/apollo_client.types";
import { RequestItemType } from "../../../types/staticData.types";
import { FindAllRequestClosingDocument } from "../../../graphql/project_closing.generated";

interface RequestClosingProps {}

export default function RequestClosing({}: RequestClosingProps) {
  const user = useSelector((state: RootState) => state.user);
  let { data, loading, error, refetch } = useQuery(FindAllRequestClosingDocument, { variables: { requiresAuth: true } })

  const navigate = useNavigate();
  const [nameFilter, setNameFilter] = useState("")
  const getData = () => {
    return data?.findAllRequestClosing
  }

  useEffect(() => {
    if (data) {
      refetch()
    }
  }, [data, refetch])

  return (
    <div className="flex flex-col" style={{ maxHeight: "100%" }}>
      <>
        <TextField
          color="secondary" sx={{ mb: 1, mr: 1 }} label="Pencarian" size='small' variant="outlined"
          onChange={(e) => { setNameFilter(e.target.value) }}
          slotProps={{
            input: {
              startAdornment: <SearchIcon></SearchIcon>,
            },
          }}
        />
        <Box maxHeight={600} overflow={"auto"}>
          {!loading && data && getData().filter((req: any) => req.title.toLowerCase().includes(nameFilter.toLowerCase()))
            .map((request: any, index: number) => {
              return (
                <div className="my-4 bg-white shadow-lg rounded-lg border border-gray-200" key={index}>
                  <div className="p-4">
                    <h2 className="text-xl font-semibold text-gray-800 flex items-center">
                      {request.requested_from.name}
                      <span className={` ms-1 badge ${RequestStatusColors[request.status as keyof typeof RequestStatusColors]}`}> {request.status}</span>
                    </h2>
                    <div className="p-1">
                    <p className="mt-1 text-gray-700">
                        <span className="font-semibold">Header: </span>{request.title}
                      </p>
                      <p className="mt-1 text-gray-700">
                        <span className="font-semibold">Tanggal pengajuan: </span>{formatDateToLong(request.requested_at.toString())}
                      </p>
                    </div>
                  </div>
                  <div className="flex justify-end p-2 bg-gray-100 rounded-b-lg">
                    <Button variant="contained" color="info" onClick={() => {
                      navigate(`/appuser/request/closing/${request._id}`)
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