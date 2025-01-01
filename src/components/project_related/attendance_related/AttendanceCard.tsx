import { Button } from "@mui/material";
import React from "react";
import { formatDateToLong } from "../../../utils/service/FormatService";
interface AttendanceCardProps {
  start_date: Date
  end_date: Date
  submit_status: boolean
  description: string
  onDetailClick: () => void,
  onDeleteClick: () => void,
  withDelete?: boolean
}

const truncateText = (text: string, maxLength: number): string => {
  return text.length > maxLength ? `${text.slice(0, maxLength)}...` : text;
};

const AttendanceCard: React.FC<AttendanceCardProps> = ({
  start_date,
  end_date,
  submit_status,
  description,
  onDetailClick,
  onDeleteClick,
  withDelete
}) => {

  const getSubmitStatusBadge = (status: boolean) => {
    if (status) {
      return <div className="badge whitespace-nowrap badge-success">Telah disubmit</div>
    } else {
      return <div className="badge whitespace-nowrap badge-info text-white">Belum submit</div>
    }
  }

  return (
    <div className="p-3 mb-3 bg-accent flex justify-between items-start rounded-lg shadow-md">
      <div className="">
        <div className="">
          <div className="text-lg mb-1">
            <span className="font-bold"> ABSENSI :</span>
            <span className="font-semibold"> {formatDateToLong(start_date.toString())} - {formatDateToLong(end_date.toString())}</span>
          </div>
          <div className="flex gap-2">
            {getSubmitStatusBadge(submit_status)}
          </div>
        </div>
        {description.length > 0 && <div className="text-sm mt-2 font-bold">{truncateText(description, 60)}</div>}
      </div>
      <div className="flex justify-start items-start flex-wrap">
        <Button variant="contained" color="secondary" sx={{ textDecoration: "none", textTransform: "none", mr: 1, mb: 1, width: 80 }} onClick={() => {
          onDetailClick()
        }}>DETAIL</Button>
        {withDelete && <Button variant="contained" color="error" sx={{ textDecoration: "none", textTransform: "none", width: 80 }} onClick={() => {
          onDeleteClick()
        }}>HAPUS</Button>}
      </div>
    </div>
  )
}

export default AttendanceCard;