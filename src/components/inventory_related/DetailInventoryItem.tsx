import { useSelector } from "react-redux";
import AddInventoryItem from "./AddInventoryItem";
import { selectUser } from "../../app/reducers/userSlice";
import { RootState } from "../../app/store";
import { EmployeeRoleType } from "../../types/staticData.types";

interface DetailInventoryItemProps {
  warehouseId: string | undefined
}

const DetailInventoryItem: React.FC<DetailInventoryItemProps> = ({ warehouseId }) => {
  const user = useSelector((state: RootState) => selectUser(state))
  const checkUserValid = () => {
    return user.role === EmployeeRoleType.ADMIN || user.role === EmployeeRoleType.OWNER || user.role === EmployeeRoleType.STAFF_PEMBELIAN
  }

  return (
    <div className="flex flex-column">
      <div>
        {checkUserValid() && <AddInventoryItem />}
      </div>
    </div>
  );
}

export default DetailInventoryItem