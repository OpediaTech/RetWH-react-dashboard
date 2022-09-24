import { yupResolver } from "@hookform/resolvers/yup";
import CloseIcon from "@mui/icons-material/Close";
import { IconButton } from "@mui/material";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { useGetDepartmentByShopQuery } from "../../app/services/departmentsApi";
import { useUpdateProductMutation } from "../../app/services/productsApi";
import { useGetShopsQuery } from "../../app/services/shopsApi";
import LoadingBtn from "../../components/controls/LoadingBtn";
import { productSchema } from "../../helpers/validation/productSchema";

const UpdateProduct = ({ setOpen, row }) => {
  // Redux element
  const { userInfo } = useSelector((state) => state.auth);

  const { shop } = useGetShopsQuery(undefined, {
    selectFromResult: ({ data }) => ({
      shop: data?.shops?.find((x) => x?.email === userInfo?.users?.email),
    }),
  });

  const { data: departmentDataByShop } = useGetDepartmentByShopQuery(
    shop && shop?._id
  );

  const [
    updateProduct,
    { isLoading, isError, error, data },
  ] = useUpdateProductMutation();

  // React hook form
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(productSchema),
  });

  // React hook form data submit
  const onSubmit = async (data) => {
    const productData = {
      productName: data.productName,
      department: data.department,
      sku: data.sku,
      image: data.image,
      quantity: data.quantity,
      status: data.status,
      email: userInfo?.users?.email,
      tax: data.tax,
      uniqueCode: data.uniqueCode,
      tags: [data.tags],
      modifier: data.modifier,
      buying_price: data.buying_price,
      prices: {
        basic: data.basic,
        standard: data.standard,
        premium: data.premium,
      },
      productOffer: {
        basic: [
          {
            quantity: data.basicQty,
            price: data.basicPrice,
          },
        ],
        standard: [
          {
            quantity: data.standardQty,
            price: data.standardPrice,
          },
        ],
        premium: [
          {
            quantity: data.premiumQty,
            price: data.premiumPrice,
          },
        ],
      },
      prodId: row?.original?._id,
    };

    // data submit
    await updateProduct(productData);
  };

  useEffect(() => {
    if (data) {
      toast.success("Successfully updated!");
      setOpen(false);
    }
    if (isError) {
      toast.error(error?.data?.error);
    }
  }, [isError, error, data, setOpen]);
  return (
    <section className="addProduct">
      <div className="addProduct__form">
        <h2 className="form__title">Update Product</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Product Name */}
          <span className="form__group">
            <label className="form__label">
              Product Name <span className="form__required">*</span>
            </label>
            <input
              className="form__control"
              type="text"
              defaultValue={row?.original?.productName}
              {...register("productName")}
            />
            {errors?.productName && (
              <span className="form__error">{errors?.productName.message}</span>
            )}
          </span>

          {/* Department */}
          <span className="form__group">
            <label className="form__label">
              Department <span className="form__required">*</span>
            </label>
            <select className="form__select" {...register("department")}>
              <option
                className="form__option"
                value={row?.original?.department?.id}
              >
                {row?.original?.department?.name}
              </option>

              {departmentDataByShop?.departments?.map(
                (department) =>
                  department?.active && (
                    <option
                      className="form__option"
                      value={department?._id}
                      key={department?._id}
                    >
                      {department?.dept_name}
                    </option>
                  )
              )}
            </select>
            {errors?.department && (
              <span className="form__error">{errors?.department.message}</span>
            )}
          </span>

          {/* SKU */}
          <span className="form__group">
            <label className="form__label">SKU</label>
            <input
              className="form__control"
              type="text"
              defaultValue={row?.original?.sku}
              {...register("sku")}
            />
            {errors?.sku && (
              <span className="form__error">{errors?.sku.message}</span>
            )}
          </span>

          <div className="form__grid">
            {/* Tag*/}
            <span className="form__group">
              <label className="form__label">Tags</label>
              <input
                className="form__control"
                type="text"
                defaultValue={row?.original?.tags}
                {...register("tags")}
              />
              {errors?.tags && (
                <span className="form__error">{errors?.tags.message}</span>
              )}
            </span>

            {/* Image */}
            <span className="form__group">
              <label className="form__label">Image</label>
              <input
                className="form__control"
                type="file"
                // placeholder="Enter product title"
                {...register("image")}
              />
              {errors?.image && (
                <span className="form__error">{errors?.image.message}</span>
              )}
            </span>
          </div>

          <div className="form__grid">
            {/* Quantity */}
            <span className="form__group">
              <label className="form__label">
                Quantity <span className="form__required">*</span>
              </label>
              <input
                className="form__control"
                type="text"
                defaultValue={row?.original?.quantity}
                {...register("quantity")}
              />
              {errors?.quantity && (
                <span className="form__error">{errors?.quantity.message}</span>
              )}
            </span>

            {/* Status */}
            <span className="form__group">
              <label className="form__label">
                Status <span className="form__required">*</span>
              </label>
              <input
                className="form__control"
                type="text"
                defaultValue={row?.original?.status}
                {...register("status")}
              />
              {errors?.status && (
                <span className="form__error">{errors?.status.message}</span>
              )}
            </span>
          </div>

          <div className="form__grid">
            {/* Modifier */}
            <span className="form__group">
              <label className="form__label">
                Modifier <span className="form__required">*</span>
              </label>
              <input
                className="form__control"
                type="text"
                defaultValue={row?.original?.modifier}
                {...register("modifier")}
              />
              {errors?.modifier && (
                <span className="form__error">{errors?.modifier.message}</span>
              )}
            </span>

            {/* Tax */}
            <span className="form__group">
              <label className="form__label">Tax</label>
              <input
                className="form__control"
                type="text"
                defaultValue={row?.original?.tax}
                {...register("tax")}
              />
            </span>
          </div>

          {/* Unique Code */}
          <span className="form__group">
            <label className="form__label">
              Unique Code <span className="form__required">*</span>
            </label>
            <input
              className="form__control"
              type="text"
              defaultValue={row?.original?.uniqueCode}
              // placeholder="Enter product title"
              {...register("uniqueCode")}
            />
            {errors?.uniqueCode && (
              <span className="form__error">{errors?.uniqueCode.message}</span>
            )}
          </span>

          {/* Prices */}
          <h3 className="form__headline">Prices</h3>
          {/* Buying Price */}
          <span className="form__group">
            <label className="form__label">
              Buying Price <span className="form__required">*</span>
            </label>
            <input
              className="form__control"
              type="text"
              defaultValue={row?.original?.prices?.buying_price}
              {...register("buying_price")}
            />
            {errors?.buying_price && (
              <span className="form__error">
                {errors?.buying_price.message}
              </span>
            )}
          </span>

          <div className="form__grid">
            {/* Basic */}
            <span className="form__group">
              <label className="form__label">
                Basic <span className="form__required">*</span>
              </label>
              <input
                className="form__control"
                type="text"
                defaultValue={row?.original?.prices?.basic}
                {...register("basic")}
              />
              {errors?.basic && (
                <span className="form__error">{errors?.basic.message}</span>
              )}
            </span>

            {/* Standard */}
            <span className="form__group">
              <label className="form__label">
                Standard <span className="form__required">*</span>
              </label>
              <input
                className="form__control"
                type="text"
                defaultValue={row?.original?.prices?.standard}
                {...register("standard")}
              />
              {errors?.standard && (
                <span className="form__error">{errors?.standard.message}</span>
              )}
            </span>

            {/* Premium */}
            <span className="form__group">
              <label className="form__label">
                Premium <span className="form__required">*</span>
              </label>
              <input
                className="form__control"
                type="text"
                defaultValue={row?.original?.prices?.premium}
                {...register("premium")}
              />
              {errors?.premium && (
                <span className="form__error">{errors?.premium.message}</span>
              )}
            </span>
          </div>

          {/* Product Offer */}
          <h3 className="form__headline">Product Offer</h3>

          {/* Basic */}
          <h4 className="form__headline2">Basic</h4>
          <div className="form__grid">
            {/* Quantity */}
            <span className="form__group">
              <label className="form__label">
                Quantity <span className="form__required">*</span>
              </label>
              <input
                className="form__control"
                type="text"
                defaultValue={row?.original?.productOffer?.basic?.[0]?.quantity}
                {...register("basicQty")}
              />
              {errors?.basicQty && (
                <span className="form__error">{errors?.basicQty.message}</span>
              )}
            </span>

            {/* Price */}
            <span className="form__group">
              <label className="form__label">
                Price <span className="form__required">*</span>
              </label>
              <input
                className="form__control"
                type="text"
                defaultValue={row?.original?.productOffer?.basic?.[0]?.price}
                {...register("basicPrice")}
              />
              {errors?.basicPrice && (
                <span className="form__error">
                  {errors?.basicPrice.message}
                </span>
              )}
            </span>
          </div>

          {/* standard */}
          <h4 className="form__headline2">Standard</h4>
          <div className="form__grid">
            {/* Quantity */}
            <span className="form__group">
              <label className="form__label">
                Quantity <span className="form__required">*</span>
              </label>
              <input
                className="form__control"
                type="text"
                defaultValue={
                  row?.original?.productOffer?.standard?.[0]?.quantity
                }
                {...register("standardQty")}
              />
              {errors?.standardQty && (
                <span className="form__error">
                  {errors?.standardQty.message}
                </span>
              )}
            </span>

            {/* Price */}
            <span className="form__group">
              <label className="form__label">
                Price <span className="form__required">*</span>
              </label>
              <input
                className="form__control"
                type="text"
                defaultValue={row?.original?.productOffer?.standard?.[0]?.price}
                {...register("standardPrice")}
              />
              {errors?.standardPrice && (
                <span className="form__error">
                  {errors?.standardPrice.message}
                </span>
              )}
            </span>
          </div>

          {/* Premium */}
          <h4 className="form__headline2">Premium</h4>
          <div className="form__grid">
            {/* Quantity */}
            <span className="form__group">
              <label className="form__label">
                Quantity <span className="form__required">*</span>
              </label>
              <input
                className="form__control"
                type="text"
                defaultValue={
                  row?.original?.productOffer?.premium?.[0]?.quantity
                }
                {...register("premiumQty")}
              />
              {errors?.premiumQty && (
                <span className="form__error">
                  {errors?.premiumQty.message}
                </span>
              )}
            </span>

            {/* Price */}
            <span className="form__group">
              <label className="form__label">
                Price <span className="form__required">*</span>
              </label>
              <input
                className="form__control"
                type="text"
                defaultValue={row?.original?.productOffer?.premium?.[0]?.price}
                {...register("premiumPrice")}
              />
              {errors?.premiumPrice && (
                <span className="form__error">
                  {errors?.premiumPrice.message}
                </span>
              )}
            </span>
          </div>

          {/* Submit button */}
          <LoadingBtn
            className="addDepartment__btn"
            color="primary"
            size="large"
            text="Update Product"
            type="submit"
            loading={isLoading}
          />
        </form>

        {/* Modal Close Button */}
        <div className="addProduct__close">
          <IconButton aria-label="close" onClick={() => setOpen(false)}>
            <CloseIcon />
          </IconButton>
        </div>
      </div>
    </section>
  );
};

export default UpdateProduct;
