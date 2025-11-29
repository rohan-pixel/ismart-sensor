import {
  Email,
  Password,
  Visibility,
  VisibilityOff,
} from "@mui/icons-material";
import { IconButton, InputAdornment, TextField } from "@mui/material";
import React, { useState } from "react";
import { Controller } from "react-hook-form";

const CustomPassword = ({
  control,
  name = "",
  label = "",
  inputProps = {},
  rules = {},
  placeholder,
}) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div>
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
              placeholder={placeholder || "password"}
              type={showPassword ? "text" : "password"}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Password />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowPassword((prev) => !prev)}
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              error={error ? true : false}
              helperText={error ? error?.message : ""}
              {...inputProps}
            />
          </>
        )}
      />
    </div>
  );
};

export default CustomPassword;
