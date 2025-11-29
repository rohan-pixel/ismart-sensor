import { TextField } from "@mui/material";
import React from "react";
import { Controller } from "react-hook-form";

const CustomInput = ({
  control,
  name = "",
  label = "",
  inputProps = {},
  className = "",
  placeholder = "",
  rules = {},
  startAdornment = () => null,
  endAdornment = () => null,
  ...others
}) => {
  return (
    <div className={`${className || ""}`}>
      <Controller
        control={control}
        name={name}
        rules={rules}
        render={({
          field: { onChange, onBlur, value, ref },
          fieldState: { error },
        }) => (
          <>
            <TextField
              onChange={onChange}
              onBlur={onBlur}
              value={value || ""}
              ref={ref}
              id={`input-field-${name}`}
              fullWidth
              size="small"
              label={label}
              variant="standard"
              placeholder={placeholder}
              InputProps={{
                startAdornment: <>{startAdornment && startAdornment()}</>,
                endAdornment: <>{endAdornment && endAdornment()}</>,
              }}
              error={error ? true : false}
              helperText={error ? error?.message : ""}
              {...others}
              {...inputProps}
            />
          </>
        )}
      />
    </div>
  );
};

export default CustomInput;
