import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useDeleteShopMutation } from "../../app/services/shopsApi";
import CustomModal from "../../components/controls/CustomModal";
import EditShop from "../../pages/additional-pages/EditShop";
import ActionButton from "../components/ActionButton";
import DeleteDialog from "../components/DeleteDialog";

const ShopAction = ({ row }) => {
  // states
  const [open, setOpen] = useState(false);
  const [deleteDialog, setDeleteDialog] = useState(false);

  // redux element
  const [
    deleteShop,
    { isLoading, isError, error, data },
  ] = useDeleteShopMutation();

  // edit functionality
  const handleEditOpen = (id) => {
    setOpen(true);
  };

  // delete functionality
  const handleShopDelete = async (shopID) => {
    await deleteShop(shopID);
  };
  useEffect(() => {
    if (data) {
      toast.success("Successfully deleted!");
      setDeleteDialog(false);
    }
    if (isError) {
      toast.error(error?.data?.error);
    }
  }, [isError, error, data, setOpen]);
  return (
    <>
      {/* Action Button */}
      <ActionButton
        handleClick={() => handleEditOpen(row?.original?._id)}
        onClick={() => setDeleteDialog(true)}
        row={row}
      />

      {/* Edit Modal */}
      <CustomModal open={open} onClose={setOpen}>
        <EditShop setOpen={setOpen} row={row} />
      </CustomModal>

      {/* Delete Dialog */}
      <DeleteDialog
        deleteDialog={deleteDialog}
        setDeleteDialog={setDeleteDialog}
        loading={isLoading}
        onClick={() => handleShopDelete(row?.original?._id)}
      />
    </>
  );
};

export default ShopAction;
