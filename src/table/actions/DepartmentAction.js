import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useDeleteDepartmentMutation } from "../../app/services/departmentsApi";
import CustomModal from "../../components/controls/CustomModal";
import UpdateDepart from "../../pages/additional-pages/UpdateDepart";
import ActionButton from "../components/ActionButton";
import DeleteDialog from "../components/DeleteDialog";

const DepartmentAction = ({ row }) => {
  // states
  const [open, setOpen] = useState(false);
  const [deleteDialog, setDeleteDialog] = useState(false);

  // redux element
  const [
    deleteDepartment,
    { isLoading, isError, error, data },
  ] = useDeleteDepartmentMutation();

  // edit functionality
  const handleEditOpen = (id) => {
    setOpen(true);
  };

  // delete functionality
  const handleShopDelete = async (deptID) => {
    await deleteDepartment(deptID);
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
        <UpdateDepart setOpen={setOpen} row={row} />
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

export default DepartmentAction;
