import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useDeleteProductMutation } from "../../app/services/productsApi";
import CustomModal from "../../components/controls/CustomModal";
import UpdateProduct from "../../pages/additional-pages/UpdateProduct";
import ActionButton from "../components/ActionButton";
import DeleteDialog from "../components/DeleteDialog";

const ProductAction = ({ row }) => {
  // states
  const [open, setOpen] = useState(false);
  const [deleteDialog, setDeleteDialog] = useState(false);

  // redux element
  const [
    deleteProduct,
    { isLoading, isError, error, data },
  ] = useDeleteProductMutation();

  // edit functionality
  const handleEditOpen = (id) => {
    setOpen(true);
  };

  // delete functionality
  const handleShopDelete = async (prodID) => {
    await deleteProduct(prodID);
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
        <UpdateProduct setOpen={setOpen} row={row} />
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

export default ProductAction;
