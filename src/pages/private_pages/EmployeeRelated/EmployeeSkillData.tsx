import React from "react";
import AddEmployeeSkill from "../../../components/emlpoyee_related/AddEmployeeSkill";
import StickyHeadTable, { StickyHeadTableColumn } from "../../../components/global_features/StickyHeadTable";
import { useQuery } from "@apollo/client";
import { GetAllSkillDocument } from "../../../graphql/person.generated";
import { Box } from "@mui/material";

interface RowData {
  _id: string,
  id: string,
  name: string,
  description: string
}

const columns: StickyHeadTableColumn<RowData>[] = [
  { id: "name", label: "Name", minWidth: 50,align: "center" },
  { id: "description", label: "Description", align: "center" },
  {
    id: 'action',
    label: 'Action',
    actionLabel: 'Ubah',
    align: "center",
    buttonColor: (row) => 'secondary'
  },
]

const EmployeeSkillData: React.FC = () => {
  let { data, loading, refetch } = useQuery(GetAllSkillDocument, { variables: { requiresAuth: true } })
  const handleActionTable = () => {
    refetch();
  }

  return (
    <div className="flex flex-col">
      <div className="text-4xl font-bold mb-2">Data Skill Pegawai Perusahaan</div>
      <AddEmployeeSkill />
      {!loading && <div>
        <StickyHeadTable
          columns={columns}
          rows={data?.getAllSkill ?? []}
          withIndex={true}
          onActionClick={handleActionTable}
        />
      </div>}
    </div>
  )
}
export default EmployeeSkillData;