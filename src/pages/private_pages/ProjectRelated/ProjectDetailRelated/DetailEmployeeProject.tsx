import { ApolloError, ApolloQueryResult, useMutation, useQuery } from "@apollo/client";
import React, { useEffect, useState } from "react";
import { FindAllProjectsQuery, FindProjectByIdQueryVariables, UpdateProjectDocument } from "../../../../graphql/project.generated";
import { Container } from "@mui/material";


interface DetailEmployeeProjectProps {
  dataProject: any,
  loadingProject: boolean,
  errorProject: ApolloError | undefined,
  refetchDetailProject: (variables?: FindProjectByIdQueryVariables) => Promise<ApolloQueryResult<FindAllProjectsQuery>>;
}

const DetailEmployeeProject: React.FC<DetailEmployeeProjectProps> = ({ dataProject, loadingProject, errorProject, refetchDetailProject }) => {

  

  return (
    <div style={{ height: "100%" }}>
      <div className="flex flex-col" style={{ maxHeight: "100%" }}>
        <Container sx={{ paddingTop: 4 }}>
          <div className="text-xl font-bold mb-2">Detail Pegawai</div>
        </Container>
      </div>
    </div>
  )
}
export default DetailEmployeeProject;