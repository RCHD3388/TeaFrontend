import { useSelector } from "react-redux";
import { RootState } from "../../../app/store";
import { Box, Button, TextField, Typography } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import AddIcon from '@mui/icons-material/Add';
import { DocumentNode, useQuery } from "@apollo/client";
import { formatDateToLong, formatISODateToCustom, RequestStatusColors } from "../../../utils/service/FormatService";
import { GetAllPurchaseOrdersDocument, GetPurchaseOrderByUserDocument } from "../../../graphql/purchasing.generated";
import { EmployeeRoleType, RequestStatusType } from "../../../types/staticData.types";


export default function PurchasingDashboard({ }) {
  const user = useSelector((state: RootState) => state.user);
  let { data, loading, error, refetch } = useQuery(GetAllPurchaseOrdersDocument, {
    variables: {
      filter: { status: user.role == EmployeeRoleType.STAFF_PEMBELIAN ? true : false },
      requiresAuth: true
    }
  })
  const navigate = useNavigate();
  const [nameFilter, setNameFilter] = useState("")
  const getData = () => {
    return data?.getAllPurchaseOrders
  }

  const getTotal = () => {
    return getData().length
  }
  const getTotalSelesai = () => {
    return getData().filter((d: any) => { return d.status == RequestStatusType.SELESAI }).length
  }

  useEffect(() => { if (data) { refetch() } }, [data, refetch])

  return (
    <div className="flex justify-center items-center" style={{ height: "100%" }}>
      <div className="container flex flex-col" style={{ maxHeight: "100%" }}>
        <>
          {user.role == EmployeeRoleType.STAFF_PEMBELIAN && <>
            {!loading && data && <>
              <Typography variant="h5" sx={{ mt: 1 }}><b>Data Pembelian</b></Typography>
              <div className="container mx-auto p-4">
                <div className="flex flex-wrap justify-center gap-4">
                  {/* Card Total Project */}
                  <div className="card flex-grow bg-blue-600 shadow-xl">
                    <div className="card-body flex justify-between items-center p-2">
                      <div className="flex items-center space-x-2">
                        <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h7v7H3zM14 3h7v7h-7zM3 14h7v7H3zM14 14h7v7h-7z" />
                        </svg>
                        <h2 className="card-title text-white text-lg">Total PO</h2>
                      </div>
                      <p className="text-3xl font-bold text-white">{getTotal()}</p>
                    </div>
                  </div>
                  {/* Card Proyek Dalam Proses */}
                  <div className="card flex-grow bg-yellow-400 shadow-xl">
                    <div className="card-body flex justify-between items-center p-2">
                      <div className="flex items-center space-x-2">
                        <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm0-2a6 6 0 100-12 6 6 0 000 12zm-1-9h2v4h-2V7zm0 6h2v2h-2v-2z" clipRule="evenodd" />
                        </svg>
                        <h2 className="card-title text-white text-lg">PO Dalam Proses</h2>
                      </div>
                      <p className="text-3xl font-bold text-white">{getTotal() - getTotalSelesai()}</p>
                    </div>
                  </div>
                  {/* Card Proyek Terselesaikan */}
                  <div className="card flex-grow bg-green-500 shadow-xl">
                    <div className="card-body flex justify-between items-center p-2">
                      <div className="flex items-center space-x-2">
                        <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <h2 className="card-title text-white text-lg">PO Terselesaikan</h2>
                      </div>
                      <p className="text-3xl font-bold text-white">{getTotalSelesai()}</p>
                    </div>
                  </div>
                </div>
              </div>
            </>}
          </>}

          <Typography variant="h5" sx={{ mt: 1 }}><b>Order Pembelian Terbaru</b></Typography>
          <Box maxHeight={300} overflow={"auto"}>
            {!loading && data && getData().filter((requestItem: any) => requestItem.status != RequestStatusType.SELESAI).length == 0 && <>
              <div className="flex justify-center items-center p-5 bg-accent shadow-md">
                BELUM TERDAPAT ORDER PEMBELIAN TERBARU
              </div></>}
            {!loading && data && getData().filter((requestItem: any) => requestItem.status != RequestStatusType.SELESAI)
              .map((requestItem: any, index: number) => {
                return (
                  <div className="mb-2 bg-white shadow-lg rounded-lg border border-gray-200" key={index}>
                    <div className="p-4">
                      <h2 className="text-xl font-semibold text-gray-800 flex items-center">
                        PO{formatISODateToCustom(requestItem.date.toString())}
                        <span className={` ms-1 badge ${RequestStatusColors[requestItem.status as keyof typeof RequestStatusColors]}`}> {requestItem.status}</span>
                      </h2>
                      <div className="p-1">
                        <p className="mt-1 text-gray-700">
                          <span className="font-semibold">Judul: </span>{requestItem.title}
                        </p>
                        <p className="mt-0 text-gray-700">
                          <span className="font-semibold">Tanggal pengajuan: </span>{formatDateToLong(requestItem.date.toString())}
                        </p>
                        <p className="mt-0 text-gray-700">
                          <span className="font-semibold">Gudang Asal: </span>
                          <span style={{ textTransform: "capitalize" }}>{requestItem.requested_from.name} ( {requestItem.requested_from.address} )</span>
                        </p>
                        <p className="mt-0 text-gray-700">
                          <span className="font-semibold">Deskripsi: </span>
                          <span style={{ textTransform: "capitalize" }}>{requestItem.description || "-"}</span>
                        </p>
                      </div>
                    </div>
                    <div className="flex justify-end p-2 bg-gray-100 rounded-b-lg">
                      <Button variant="contained" color="info" onClick={() => {
                        navigate(`/appuser/request/po/${requestItem._id}`)
                      }}>Detail</Button>
                    </div>
                  </div>
                )
              })}
          </Box>
        </>
      </div>
    </div>
  );
}