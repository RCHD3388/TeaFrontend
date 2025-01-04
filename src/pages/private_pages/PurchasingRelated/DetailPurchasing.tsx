import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { Box, Button, Card, CardContent, Chip, Container, Divider, IconButton, InputAdornment, Stack, TextField, Typography } from '@mui/material';
import ReplyAllIcon from '@mui/icons-material/ReplyAll';
import { theme } from '../../../theme';
import { useMutation, useQuery } from '@apollo/client';
import { selectUser } from '../../../app/reducers/userSlice';
import { RootState } from '../../../app/store';
import { useDispatch, useSelector } from 'react-redux';
import { EmployeeRoleType, RequestItem_ItemType, RequestItemType, RequestStatusType } from '../../../types/staticData.types';
import { CancelPurchaseOrderDocument, GetPurchaseOrderByIdDocument, GetPurchaseTransactionByIdDocument, HandleWaitingPoDocument } from '../../../graphql/purchasing.generated';

interface DetailPurchasingProps { }


const DetailPurchasing: React.FC<DetailPurchasingProps> = ({ }) => {
  const { purchasingId } = useParams();
  const { data, loading, error, refetch } = useQuery(GetPurchaseTransactionByIdDocument, { variables: { id: purchasingId }, });
  const navigate = useNavigate();
  const user = useSelector((state: RootState) => selectUser(state));
  const [isSubmitting, setIsSubmitting] = useState(false);

  const dispatch = useDispatch()
  const getItemName = (item_type: String, item: String) => {
    if (item_type == RequestItem_ItemType.MATERIAL) {
      let material = data?.getPurchaseOrderByID.materials.find((mat: any) => { return mat._id == item })
      return material ? `${material.name} (${material.conversion} x ${material.minimum_unit_measure.name}) - ${material.merk.name}` : ``
    } else if (item_type == RequestItem_ItemType.TOOL) {
      let sku = data?.getPurchaseOrderByID.skus.find((sku: any) => { return sku._id == item })
      return sku ? `${sku.name} - ${sku.merk.name}` : ``
    }
    return ""
  }

  const getDataRequest = () => {
    return data?.getPurchaseOrderByID.purchase_order
  }

  return (
    <div className="p-5" style={{ height: "100%" }}>
      <div className="flex flex-col" style={{ maxHeight: "100%" }}>
        <Box display={"flex"}>
          <IconButton
            style={{ backgroundColor: theme.palette.secondary.main, height: 40, width: 40, borderRadius: 8, color: 'white' }}
            sx={{ mr: 1 }}
            onClick={() => { navigate(-1) }}
          >
            <ReplyAllIcon fontSize="medium"></ReplyAllIcon>
          </IconButton>
          <div className="text-4xl font-bold mb-2">Detail Pembelian</div>
        </Box>
      </div>
    </div>
  )
}

export default DetailPurchasing
