import { Email } from "@mui/icons-material";
import { Autocomplete, InputAdornment, TextField } from "@mui/material";
import React from "react";
import { Controller } from "react-hook-form";

const CustomSelect = ({
  control,
  name = "",
  label = "",
  options = [],
  textInputProps = {},
  className = "",
  placeholder = "",
  rules = {},
  startAdornment = () => null,
  endAdornment = () => null,
}) => {
  // render options
  // function defaultRenderOption(props, option, state) {
  //   return (
  //     <li {...props} className={`${props.className} option-list`}>
  //       <p className="rendered-text elipsed-text">
  //         {typeof option === "string" ? option : ""}
  //       </p>
  //       <div className="right-text">
  //         <span>select</span>
  //         <KeyboardReturn />
  //       </div>
  //     </li>
  //   );
  // }

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
            <Autocomplete
              disablePortal
              id={`select-${name}`}
              value={value || null}
              onBlur={onBlur}
              options={options}
              getOptionLabel={(option) => option?.value || ""}
              isOptionEqualToValue={(option, value) =>
                option?.key === value?.key ||
                (option?.key === "" && value?.key === null)
              }
              onChange={(_, value) => onChange(value)}
              renderInput={(params) => (
                <TextField
                  {...params}
                  inputRef={ref}
                  variant="standard"
                  label={label}
                  placeholder={placeholder}
                  InputProps={{
                    ...params.InputProps,
                    startAdornment: (
                      <>
                        {startAdornment()}
                        {params.InputProps.startAdornment}
                      </>
                    ),
                    endAdornment: (
                      <>
                        {params.InputProps.endAdornment}
                        {endAdornment()}
                      </>
                    ),
                  }}
                  {...textInputProps}
                  error={error ? true : false}
                  helperText={error ? error?.message : ""}
                />
              )}
            />
          </>
        )}
      />
    </div>
  );
};

export default CustomSelect;
