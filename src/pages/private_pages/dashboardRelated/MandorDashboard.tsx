import { useSelector } from "react-redux";
import { RootState } from "../../../app/store";
import { Box, Button, TextField, Typography } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import AddIcon from '@mui/icons-material/Add';
import { DocumentNode, useQuery } from "@apollo/client";
import { FindYourApprovalItemTransactionDocument, FindYourRequestItemTransactionDocument } from "../../../graphql/request_item.generated";
import { formatDateToLong, RequestStatusColors } from "../../../utils/service/FormatService";
import { CustomGraphQLError } from "../../../types/apollo_client.types";
import { RequestItemType, RequestStatusType } from "../../../types/staticData.types";

export default function MandorDashboard({ }) {
  const user = useSelector((state: RootState) => state.user);
  let { data, loading, error, refetch } = useQuery(FindYourApprovalItemTransactionDocument, { variables: { requiresAuth: true } })

  const navigate = useNavigate();
  const [nameFilter, setNameFilter] = useState("")
  const getData = () => {
    return data['findYourApprovalItemTransaction']
  }

  const getClassByType = (type: String) => {
    if (type === RequestItemType.PENGEMBALIAN) {
      return "badge badge-success text-white"
    } else if (type === RequestItemType.PEMINJAMAN) {
      return "badge badge-warning text-black"
    }
  }

  useEffect(() => {
    if (data) {
      refetch()
    }
  }, [data, refetch])

  return (
    <div className="flex flex-col justiy-center items-center" style={{ maxHeight: "100%", width: "100%" }}>
      <div className="container mx-auto p-4">
        <Typography variant="h5" sx={{ mt: 1 }}><b>Permintaan Perpindahan Barang</b></Typography>
        <Box maxHeight={300} overflow={"auto"}>
          {!loading && data && getData().filter((req: any) => req.status != RequestStatusType.SELESAI).length == 0 &&
            <div className="flex justify-center items-center p-5 bg-accent shadow-md">
              BELUM TERDAPAT PERMINTAAN TERBARU
            </div>
          }
          {!loading && data && getData().filter((req: any) => req.status != RequestStatusType.SELESAI)
            .map((requestItem: any, index: number) => {
              return (
                <div className="my-4 bg-white shadow-lg rounded-lg border border-gray-200" key={index}>
                  <div className="p-4">
                    <h2 className="text-xl font-semibold text-gray-800 flex items-center">
                      {requestItem.title}
                      <span className={` ms-1 badge ${RequestStatusColors[requestItem.status as keyof typeof RequestStatusColors]}`}> {requestItem.status}</span>
                    </h2>
                    <div className="p-1">
                      <p className="mt-1 text-gray-700">
                        <span className="font-semibold">Tanggal pengajuan: </span>{formatDateToLong(requestItem.requested_at.toString())}
                      </p>
                      <p className="mt-0 text-gray-700">
                        <span className="font-semibold">Tipe perpindahan: </span><span className={`${getClassByType(requestItem.type)}`}>{requestItem.type}</span>
                      </p>
                      <p className="mt-0 text-gray-700">
                        <span className="font-semibold">Gudang Asal: </span>
                        <span style={{ textTransform: "capitalize" }}>{requestItem.requested_from.name} ( {requestItem.requested_from.address} )</span>
                      </p>
                      <p className="mt-0 text-gray-700">
                        <span className="font-semibold">Gudang Tujuan: </span>
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
        </Box>
      </div>
    </div>
  );
}