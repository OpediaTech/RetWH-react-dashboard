import React, { useState } from "react";
import ActionButton from "../components/ActionButton";
import DeleteDialog from "../components/DeleteDialog";
import ViewDialog from "../components/ViewDialog";

const ViewAction = ({ row, view }) => {
  // States
  const [open, setOpen] = useState(false);
  const [deleteDialog, setDeleteDialog] = useState(false);

  // Table item edit functionality
  const handleView = (x) => {
    setOpen(true);
  };

  // Table item delete functionality
  const handleDelete = () => {
    setDeleteDialog(true);
  };

  return (
    <>
      <ActionButton
        handleClick={handleView}
        handleDelete={handleDelete}
        row={row}
        view={view}
        isDisabled={true}
      />

      <ViewDialog open={open} setOpen={setOpen} />
      <DeleteDialog
        deleteDialog={deleteDialog}
        setDeleteDialog={setDeleteDialog}
      />
    </>
  );
};

export default ViewAction;
