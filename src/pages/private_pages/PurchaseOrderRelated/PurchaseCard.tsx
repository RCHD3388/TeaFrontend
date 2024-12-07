export const PurchaseCard: React.FC = (props) => {
  const getStatusColor = (status: string | undefined) => {
    switch (status?.toLowerCase()) {
      case 'pending':
        return 'bg-[#75C8BE]'; // Light green for "Pending"
      case 'aktif':
        return 'bg-[#A8D18D]'; // Green for "Aktif"
      case 'selesai':
        return 'bg-[#E06666]'; // Red for "Selesai"
      default:
        return 'bg-gray-200'; // Default color for unknown statuses
    }
  };

  return (
    <div className='bg-[#F6F9D6] py-4 px-8 mb-4 flex justify-between'>
      <div className='flex'>
        <div>
          <h1 className='text-2xl font-bold'>{props.data?.title}</h1>
          <p className='mt-4'>oleh : {props.data?.requested_from}</p>
        </div>
        <div
          className={`${getStatusColor(
            props.data?.status
          )} rounded-full h-8 w-24 flex items-center justify-center ml-16 mt-4`}>
          {props.data?.status}
        </div>
      </div>
      <button className='bg-[#1A381F] rounded text-white w-36 h-10'>
        Lihat detail
      </button>
    </div>
  );
};
