import { Button } from "@mui/material";
import React from "react";
import { WarehouseType } from "../../types/staticData.types";
interface CustomListComponentProps {
  title: string
  type: string
  status: string
  description: string
  onDetailClick: () => void
}

const truncateText = (text: string, maxLength: number): string => {
  return text.length > maxLength ? `${text.slice(0, maxLength)}...` : text;
};

const ComponentCard: React.FC<CustomListComponentProps> = ({
  title, 
  type, 
  status, 
  description,
  onDetailClick
}) => {

  const getWarehouseTypeBadge = (type: string) => {
    if(type === WarehouseType.INVENTORY) {
      return <div className="badge badge-warning text-white">{type}</div>
    }else{
      return <div className="badge badge-info text-white">{type}</div>
    }
  }

  const getWarehouseStatusBadge = (status: string) => {
    if(status === "Active") {
      return <div className="badge badge-success text-white">{status}</div>
    }else{
      return <div className="badge badge-warning">{status}</div>
    }
  }

  return (
    <div className="p-3 mb-3 bg-accent flex justify-between rounded">
      <div className="">
        <div className="mb-2">
          <div className="font-bold text-2xl">{title}</div>
          <div className="flex gap-2">
            {getWarehouseTypeBadge(type)}
            {getWarehouseStatusBadge(status)}
          </div>
        </div>
        <div className="text-sm">{truncateText(description, 60)}</div>
      </div>
      <div>
        <Button variant="contained" color="secondary" sx={{ textDecoration: "none", textTransform: "none" }} onClick={() => {
          onDetailClick()
        }}>Detail</Button>
      </div>
    </div>
  )
}

export default ComponentCard;