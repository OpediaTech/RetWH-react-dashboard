import CloseIcon from "@mui/icons-material/Close";
import DownloadIcon from "@mui/icons-material/Download";
import { IconButton } from "@mui/material";
import React, { useEffect, useState } from "react";
import { FileUploader } from "react-drag-drop-files";
import toast from "react-hot-toast";
import { useCreateBulkProductMutation } from "../../app/services/productsApi";
import csv_file from "../../assets/products.csv";
import LoadingBtn from "../../components/controls/LoadingBtn";

const AddBulkProduct = ({ setOpenModal }) => {
  const [files, setFiles] = useState(null);
  const handleChange = (file) => {
    setFiles(file);
  };

  const [
    createBulkProduct,
    { isLoading, isError, error, data },
  ] = useCreateBulkProductMutation();

  // data submit
  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();

    formData.append("products_csv", files);

    await createBulkProduct(formData);
  };

  useEffect(() => {
    if (data) {
      toast.success("Successfully created!");
      setOpenModal(false);
    }
    if (isError) {
      toast.error(error?.data?.error);
    }
  }, [isError, error, data, setOpenModal]);
  return (
    <section className="addBulkProduct">
      <div className="addBulkProduct__form">
        <h2 className="form__title">Add Bulk Product</h2>
        <form onSubmit={handleSubmit}>
          <FileUploader
            handleChange={handleChange}
            name="products_csv"
            multiple={false}
            types={["CSV", "TEXT"]}
          />

          <span className="form__info">
            {files ? `File name: ${files?.name}` : "No files uploaded yet"}
          </span>

          {/* Submit button */}
          <div className="addBulkProductButton__group">
            <LoadingBtn
              className="addBulkProduct__btn"
              color="primary"
              size="large"
              text="Add Product"
              loading={isLoading}
              onClick={handleSubmit}
              disabled={!files && true}
            />
            <a href={csv_file} download>
              <LoadingBtn
                className="addBulkProduct__btn"
                color="primary"
                size="large"
                text="Download csv File"
                endIcon={<DownloadIcon />}
              />
            </a>
          </div>
        </form>

        {/* Modal Close Button */}
        <div className="addBulkProduct__close">
          <IconButton aria-label="close" onClick={() => setOpenModal(false)}>
            <CloseIcon />
          </IconButton>
        </div>
      </div>
    </section>
  );
};

export default AddBulkProduct;
