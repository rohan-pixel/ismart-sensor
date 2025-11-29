import React, { useMemo, useState, useEffect, useCallback } from "react";
import { Container } from "@mui/system";
import { Button, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import CustomInput from "../Components/CustomInput";
import CustomSelect from "../Components/CustomSelect";
import { ArrowBack } from "@mui/icons-material";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { updateAssets } from "../Redux/features/assets/assetSlice";
import CustomUploadImage from "../Components/CustomUploadImage";

function Editasset() {
  const { control, handleSubmit, reset } = useForm();

  const assets = useSelector((state) => state.assetsReducer.assets);
  const plants = useSelector((state) => state.plantReducer.plants);
  const assetGroups = useSelector(
    (state) => state.assetGroupReducer.assetGroup
  );

  const dispatch = useDispatch();

  const [otherProperty, setOtherProperty] = useState([]);

  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const serialNumber = useMemo(
    () => searchParams.get("serialNumber"),
    [searchParams]
  );

  const getAssetDetail = useCallback(
    (serialNumber) => {
      // Navigate to the asset list
      if (!serialNumber) return navigate("/");

      const assetDetail = assets.find(
        (ele) => ele.serialNumber === serialNumber
      );

      if (!assetDetail) {
        alert(`No Asset exists with Serial Number: ${serialNumber}`);
        return navigate("/");
      }

      const { otherProperty, ...others } = assetDetail;

      let resetValue = {};

      if (otherProperty) {
        otherProperty.forEach((element) => {
          if (element?.otherValues) {
            resetValue[element.propertyName?.replaceAll(" ", "_")] = {
              key: element?.defaultValue?.replaceAll(" ", "_"),
              value: element?.defaultValue,
            };
          } else {
            resetValue[element.propertyName?.replaceAll(" ", "_")] =
              element?.defaultValue;
          }
        });
      }

      setOtherProperty(assetDetail?.otherProperty || []);

      reset({
        ...others,
        ...resetValue,
      });
    },
    [assets]
  );

  useEffect(() => {
    // find asset Details
    getAssetDetail(serialNumber);
  }, [serialNumber, assets]);

  const onSubmit = useCallback(
    (data) => {
      const {
        assetGroup,
        assetImage,
        assetName,
        connectionType,
        plant,
        serialNumber,
        ...others
      } = data;

      let prevOtherProperty = otherProperty;

      let postData = {
        assetGroup,
        assetImage,
        assetName,
        connectionType,
        plant,
        serialNumber,
      };

      if (prevOtherProperty && prevOtherProperty?.length > 0) {
        let updatedOtherProperty = prevOtherProperty.map((ele) => {
          let key = ele?.propertyName?.replaceAll(" ", "_");

          let propertyDetail = others[key];

          return {
            ...ele,
            defaultValue: propertyDetail?.value || propertyDetail,
          };
        });

        postData.otherProperty = updatedOtherProperty;
      }

      dispatch(updateAssets(postData));
      navigate("/");
    },
    [otherProperty]
  );

  return (
    <Container className={"container dashboard-container"}>
      <div className="top">
        <Button
          sx={{
            position: "absolute",
          }}
          color="secondary"
          onClick={() => navigate(-1)}
          startIcon={<ArrowBack />}
          size="small"
        >
          Back
        </Button>

        <Typography textAlign={"center"} className="heading" variant="h5">
          Edit Asset
        </Typography>
      </div>

      <form className="edit-asset-form" onSubmit={handleSubmit(onSubmit)}>
        <CustomUploadImage
          control={control}
          name="assetImage"
          label="Asset Image"
          placeholder="Asset Image"
          rules={{
            required: "Asset Image is required",
          }}
        />
        <div className="input-fields">
          <CustomInput
            control={control}
            name="assetName"
            label="Sensor Name"
            placeholder="Sensor Name"
          />

          <CustomInput
            control={control}
            name="serialNumber"
            label="Serial Number"
            placeholder="Serial Number"
            disabled={true}
          />

          <CustomSelect
            control={control}
            name="assetGroup"
            label="Asset Group"
            placeholder="Asset Group"
            options={assetGroups || []}
          />

          <CustomSelect
            control={control}
            name="plant"
            label="Plant"
            placeholder="Plant"
            options={plants || []}
          />

          <CustomSelect
            control={control}
            name="connectionType"
            label="Connection Type"
            placeholder="Connection Type"
            options={[
              {
                key: "star",
                value: "Star",
              },
            ]}
          />

          {otherProperty?.length > 0 &&
            otherProperty.map((inputDetail) => {
              let type = null;
              if (
                Array.isArray(inputDetail?.otherValues) &&
                inputDetail?.otherValues?.length > 0
              ) {
                type = "select";
              } else {
                type = "input";
              }

              switch (type) {
                case "select":
                  return (
                    <CustomSelect
                      key={`${inputDetail?.propertyName}`}
                      control={control}
                      name={inputDetail?.propertyName?.replaceAll(" ", "_")}
                      label={inputDetail?.propertyName}
                      options={inputDetail?.otherValues || []}
                      placeholder={inputDetail?.propertyName}
                      endAdornment={() =>
                        inputDetail?.propertyUnit ? (
                          <Typography>{inputDetail?.propertyUnit}</Typography>
                        ) : null
                      }
                    />
                  );

                case "input":
                  return (
                    <CustomInput
                      key={`${inputDetail?.propertyName}`}
                      control={control}
                      name={inputDetail?.propertyName?.replaceAll(" ", "_")}
                      label={inputDetail?.propertyName}
                      placeholder={inputDetail?.propertyName}
                      endAdornment={() =>
                        inputDetail?.propertyUnit ? (
                          <Typography>{inputDetail?.propertyUnit}</Typography>
                        ) : null
                      }
                    />
                  );

                default:
                  break;
              }
            })}
        </div>

        <Button fullWidth size="small" type="submit" variant="contained">
          Submit
        </Button>
      </form>
    </Container>
  );
}

export default Editasset;
