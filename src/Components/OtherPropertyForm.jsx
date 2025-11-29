import React, { useState, useCallback } from "react";
import {
  Button,
  Typography,
  Divider,
  IconButton,
  Tooltip,
} from "@mui/material";
import { useForm } from "react-hook-form";
import CustomInput from "./CustomInput";
import { ControlPoint } from "@mui/icons-material";

import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { updateAssets } from "../Redux/features/assets/assetSlice";
import { useNavigate } from "react-router-dom";

const OtherPropertyForm = ({ serialNumber }) => {
  const { control, handleSubmit } = useForm();

  const [parameterNumber, setParameterNumber] = useState(1);

  const assets = useSelector((state) => state.assetsReducer.assets);

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const convertDataToOtherProperty = useCallback((data) => {
    const otherProperty = [];

    // Iterate over the properties in the data object
    for (let i = 1; i <= Object.keys(data).length / 4; i++) {
      const propertyName = data[`propertyName_${i}`];
      const propertyUnit = data[`propertyUnit_${i}`];
      const defaultValue = data[`defaultValue_${i}`];
      const otherValues = data[`otherValues_${i}`]
        ?.split(",")
        .map((value) => ({ key: value?.trim(), value: value?.trim() }));

      // Create a new object in the otherProperty array
      otherProperty.push({
        propertyName,
        propertyUnit,
        defaultValue,
        otherValues,
      });
    }

    return otherProperty;
  }, []);

  const onSubmit = useCallback(
    (data) => {
      // console.log("data:::", data);
      let otherProperty = convertDataToOtherProperty(data);
      dispatch(updateAssets({ serialNumber, otherProperty }));
      navigate("/");
    },
    [assets, serialNumber]
  );

  return (
    <>
      <Divider
        sx={{
          margin: "2rem auto",
        }}
      />
      <motion.form
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="edit-asset-form"
        onSubmit={handleSubmit(onSubmit)}
      >
        <Typography className="sub-heading">Other Property</Typography>

        {Array.from({ length: parameterNumber }, (_, index) => index + 1).map(
          (key, i) => (
            <motion.div
              initial={{ y: 100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6 }}
              className="input-fields"
              key={key}
            >
              <CustomInput
                control={control}
                name={`propertyName_${key}`}
                placeholder="Property Name"
                label="Property Name"
              />
              <CustomInput
                control={control}
                name={`propertyUnit_${key}`}
                placeholder="Property Unit"
                label="Property Unit"
              />
              <CustomInput
                control={control}
                name={`defaultValue_${key}`}
                placeholder="Default Value"
                label="Default Value"
              />
              <CustomInput
                control={control}
                name={`otherValues_${key}`}
                placeholder="Other Values(separated by ',')"
                label="Other Values(separated by ',')"
              />
            </motion.div>
          )
        )}

        <div className="algnRight">
          <Tooltip title={"Add more other property"}>
            <IconButton
              onClick={() => {
                setParameterNumber((prev) => prev + 1);
              }}
            >
              {" "}
              <ControlPoint />{" "}
            </IconButton>
          </Tooltip>
        </div>

        <Button fullWidth size="small" type="submit" variant="contained">
          Submit
        </Button>
      </motion.form>
    </>
  );
};

export default OtherPropertyForm;
