import { useSelector } from "react-redux";
import { RootState } from "../../../app/store";
import AddRequestCost from "../../../components/request_related/request_cost_related/AddRequestCost";
import { FindAllRequestCostsDocument } from "../../../graphql/request.generated";
import { useQuery } from "@apollo/client";
import { formatCurrency, formatDateToLong, RequestStatusColors } from "../../../utils/service/FormatService";
import { Box, Button } from "@mui/material";
import { useState } from "react";

export default function RequestCost() {
  const user = useSelector((state: RootState) => state.user);
  let { data, loading, error, refetch } = useQuery(FindAllRequestCostsDocument, { variables: { requiresAuth: true } })
  const [curPage, setCurPage] = useState(0);
  const [curData, setCurData] = useState<any | undefined>(undefined)

  return (
    <div className="flex flex-col" style={{ maxHeight: "100%" }}>
      {curPage == 0 && <>
        <div className="flex justify-end"><AddRequestCost refetchRequestCost={refetch} /></div>

        {!loading && data && data.findAllRequestCosts.map((requestCost: any, index: number) => {

          return (
            <div className="my-4 bg-white shadow-lg rounded-lg border border-gray-200">
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
                  setCurPage(1)
                  setCurData(data.findAllRequestCosts[index])
                }}>Detail</Button>
              </div>
            </div>
          )
        })}
      </>}
      {curPage == 1 && <>
        <div className="" style={{ height: "100%" }}>
          <div className="flex flex-col" style={{ maxHeight: "100%" }}>
            <Box display={"flex"} alignItems={"center"} justifyContent={"space-between"} mb={2}>
              <div className="text-2xl font-bold mb-2">Detail Permintaan Pengeluaran</div>
              <Button
                variant="contained"
                color="secondary"
                onClick={() => { setCurPage(0); setCurData(undefined); }}
              >Kembali Ke Daftar Permintaan</Button>
            </Box>
            {!curData ? <div className="flex justify-center items-center p-5 bg-accent shadow-md">
              DETAIL PERMINTAAN PENGELUARAN TIDAK DITEMUKAN
            </div> : <></>}
          </div>
        </div>
      </>}
    </div>
  );
}