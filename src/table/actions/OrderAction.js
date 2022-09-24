import React, { useState } from "react";
import CustomModal from "../../components/controls/CustomModal";
import UpdateOrderStatus from "../../pages/additional-pages/UpdateOrderStatus";
import ActionButton from "../components/ActionButton";
import DeleteDialog from "../components/DeleteDialog";

const OrderAction = ({ row, paymentStatus, shippingStatus }) => {
  // states
  const [open, setOpen] = useState(false);
  const [deleteDialog, setDeleteDialog] = useState(false);

  // redux element
  //   const [
  //     deleteShop,
  //     { isLoading, isError, error, data },
  //   ] = useDeleteShopMutation();

  // edit functionality
  const handleEditOpen = (id) => {
    setOpen(true);
  };

  // delete functionality
  //   const handleShopDelete = async (shopID) => {
  //     await deleteShop(shopID);
  //   };
  //   useEffect(() => {
  //     if (data) {
  //       toast.success("Successfully deleted!");
  //       setDeleteDialog(false);
  //     }
  //     if (isError) {
  //       toast.error(error?.data?.error);
  //     }
  //   }, [isError, error, data, setOpen]);
  return (
    <>
      {/* Action Button */}
      <ActionButton
        handleClick={() => handleEditOpen(row?.original?._id)}
        onClick={() => setDeleteDialog(true)}
        row={row}
        isDisabled={true}
      />

      {/* Edit Modal */}
      <CustomModal open={open} onClose={setOpen}>
        <UpdateOrderStatus
          setOpen={setOpen}
          row={row}
          paymentStatus={paymentStatus}
          shippingStatus={shippingStatus}
        />
      </CustomModal>

      {/* Delete Dialog */}
      <DeleteDialog
        deleteDialog={deleteDialog}
        setDeleteDialog={setDeleteDialog}
        // loading={isLoading}
        // onClick={() => handleShopDelete(row?.original?._id)}
      />
    </>
  );
};

export default OrderAction;
