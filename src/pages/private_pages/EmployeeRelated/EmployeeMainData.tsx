import { Button } from "@mui/material";
import React from "react";

const EmployeeMainData : React.FC = () => {

  function handleOpenAddModal(){
    
  }

  return(
    <div className="flex flex-col">
      <div className="text-4xl font-bold mb-2">Data Pegawai Perusahaan</div>
      <Button variant="contained" color='secondary' style={{ marginBottom: "1rem" }}
        onClick={() => { handleOpenAddModal() }}
      >Tambah Kategori</Button>
    </div>
  )
}
export default EmployeeMainData;