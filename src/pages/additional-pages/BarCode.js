// {/* Unique Code */}
// <h3 className="form__headline">Unique Code</h3>
// <FormControl sx={{ flexDirection: "row" }}>
//   <RadioGroup
//     aria-labelledby="demo-controlled-radio-buttons-group"
//     name="controlled-radio-buttons-group"
//     value={value}
//     onChange={handleChange}
//     row
//   >
//     <FormControlLabel
//       value="barCode"
//       control={<Radio size="small" color="secondary" />}
//       label={
//         <label className="form__label">
//           Bar Code <span className="form__required">*</span>
//         </label>
//       }
//     />
//     <FormControlLabel
//       value="upc"
//       control={<Radio size="small" color="secondary" />}
//       label={
//         <label className="form__label">
//           UPC <span className="form__required">*</span>
//         </label>
//       }
//     />
//   </RadioGroup>
// </FormControl>

// {/* Bar Code */}
// {value === "barCode" && (
//   <span className="form__group">
//     <input
//       className="form__control"
//       type="text"
//       placeholder="Enter bar code"
//       {...register("barCode")}
//     />
//     {errors?.barCode && (
//       <span className="form__error">{errors?.barCode.message}</span>
//     )}
//   </span>
// )}

// {value === "upc" && (
//   <span className="form__group">
//     <input
//       className="form__control"
//       type="text"
//       placeholder="Enter upc"
//       {...register("upc")}
//     />
//     {errors?.upc && (
//       <span className="form__error">{errors?.upc.message}</span>
//     )}
//   </span>
// )}
