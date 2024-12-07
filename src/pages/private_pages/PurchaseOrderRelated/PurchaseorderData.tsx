import React from 'react';
import { useGetAllPurchaseOrdersQuery } from '../../../graphql/purchaseorder.generated'; // Adjust the import path as per your project structure
import { PurchaseCard } from './PurchaseCard';

const PurchaseorderData: React.FC = () => {
  // Call the query hook
  const { data, loading, error } = useGetAllPurchaseOrdersQuery();

  // Handle loading and error states
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  // Render the data
  return (
    <div>
      <div className=''>
        {data?.getAllPurchaseOrders.map((order) => (
          <PurchaseCard data={order}></PurchaseCard>
        ))}
      </div>
    </div>
  );
};

export default PurchaseorderData;
