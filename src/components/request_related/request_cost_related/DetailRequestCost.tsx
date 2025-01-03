import React from 'react'
import { FindAllRequestCostsQuery, FindAllRequestCostsQueryVariables } from '../../../graphql/request.generated';
import { ApolloQueryResult } from '@apollo/client';

interface DetailRequestCostProps {
  refetchRequestCost: (variables?: FindAllRequestCostsQueryVariables) => Promise<ApolloQueryResult<FindAllRequestCostsQuery>>;

}

const DetailRequestCost: React.FC<DetailRequestCostProps> = ({refetchRequestCost}) => {
  return (
    <div>
      
    </div>
  )
}

export default DetailRequestCost
