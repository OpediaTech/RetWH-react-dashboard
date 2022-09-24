import React, { cloneElement, useState } from "react";
import CustomModal from "../../components/controls/CustomModal";
import ActionButton from "../components/ActionButton";
import DeleteDialog from "../components/DeleteDialog";

const EditAction = ({ row, children }) => {
  // Modal state
  const [open, setOpen] = useState(false);
  const [deleteDialog, setDeleteDialog] = useState(false);

  // Table item edit functionality
  const handleEdit = (x) => {
    setOpen(true);
  };

  // Table item delete functionality
  const handleDelete = () => {
    setDeleteDialog(true);
  };

  return (
    <>
      <ActionButton
        handleClick={handleEdit}
        handleDelete={handleDelete}
        row={row}
      />

      <CustomModal open={open} onClose={setOpen}>
        {cloneElement(children, { setOpen: setOpen })}
      </CustomModal>
      <DeleteDialog
        deleteDialog={deleteDialog}
        setDeleteDialog={setDeleteDialog}
      />
    </>
  );
};

export default EditAction;
