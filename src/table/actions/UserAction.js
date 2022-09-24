import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { useDeleteUserMutation } from "../../app/services/usersApi";
import CustomModal from "../../components/controls/CustomModal";
import AdminUpdateUser from "../../pages/additional-pages/AdminUpdateUser";
import UpdateUser from "../../pages/additional-pages/UpdateUser";
import ActionButton from "../components/ActionButton";
import DeleteDialog from "../components/DeleteDialog";

const UserAction = ({ row, children }) => {
  // states
  const [open, setOpen] = useState(false);
  const [deleteDialog, setDeleteDialog] = useState(false);

  // Redux element
  const { userInfo } = useSelector((state) => state.auth);
  const [
    deleteUser,
    { isLoading, isError, error, data },
  ] = useDeleteUserMutation();

  // edit functionality
  const handleEditOpen = (id) => {
    setOpen(true);
  };

  // delete functionality
  const handleUserDelete = async (email) => {
    await deleteUser(email);
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
        isDisabled={userInfo?.users?.role === "admin" && true}
      />

      {/* Edit Modal */}
      <CustomModal open={open} onClose={setOpen}>
        {userInfo?.users?.role === "admin" ? (
          <AdminUpdateUser setOpen={setOpen} row={row} />
        ) : (
          <UpdateUser setOpen={setOpen} row={row} />
        )}
      </CustomModal>

      {/* Delete Dialog */}
      <DeleteDialog
        deleteDialog={deleteDialog}
        setDeleteDialog={setDeleteDialog}
        loading={isLoading}
        onClick={() => handleUserDelete(row?.original?.email)}
      />
    </>
  );
};

export default UserAction;
