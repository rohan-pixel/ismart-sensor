import React, { useCallback, useMemo, useState, useEffect } from "react";
import { Button, Typography } from "@mui/material";
import { Container } from "@mui/system";
import { useForm } from "react-hook-form";
import { useNavigate, useSearchParams } from "react-router-dom";
import { ArrowBack } from "@mui/icons-material";
import CustomInput from "../Components/CustomInput";
import { useDispatch, useSelector } from "react-redux";
import { updateAssets } from "../Redux/features/assets/assetSlice";
import CustomUploadImage from "../Components/CustomUploadImage";

function Configure() {
  const { control, handleSubmit, reset } = useForm();

  const [image, setImage] = useState(null);

  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const assets = useSelector((state) => state.assetsReducer.assets);

  const dispatch = useDispatch();

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

      console.log("assetDetail:::", assetDetail);
      const { otherProperty, ...others } = assetDetail;

      setImage(others?.assetImage);

      reset({
        ...others,
      });
    },
    [assets]
  );

  useEffect(() => {
    // find asset Details
    getAssetDetail(serialNumber);
  }, [serialNumber, assets]);

  const onSubmit = useCallback((data) => {
    const { minute } = data;

    if (parseInt(minute) > 59) {
      data.hours = (data.hours || 0) + Math.floor(minute / 60);
      data.minute = minute % 60;
    }

    dispatch(updateAssets({ hours: 0, ...data }));

    navigate("/");
  }, []);

  return (
    <Container>
      <div className="dashboard-container">
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

          <Typography className="heading">Configure Device</Typography>
        </div>

        <div className="image-container">
          {image && <img loading="lazy" src={image} alt="dashboard-img" />}
        </div>

        <div className="edit-asset-form">
          <form onSubmit={handleSubmit(onSubmit)}>
            <Typography className="sub-heading">Trend Interval</Typography>
            <div className="configure-fields">
              <CustomInput
                className="configure-input"
                control={control}
                type="number"
                name="hours"
                placeholder="Hours"
                endAdornment={() => <Typography>hr</Typography>}
              />
              <CustomInput
                className="configure-input"
                control={control}
                type="number"
                name="minute"
                placeholder="Minute"
                endAdornment={() => <Typography>min</Typography>}
                rules={{
                  required: "Minute is required",
                }}
              />
            </div>

            <Typography className="sub-heading">Alert</Typography>

            <div className="configure-fields">
              <CustomInput
                className="configure-input"
                control={control}
                type="number"
                name="xAxisAlert"
                placeholder="X-axis"
                endAdornment={() => <Typography>X</Typography>}
                rules={{
                  required: "Alert X-axis is required",
                }}
              />
              <CustomInput
                className="configure-input"
                control={control}
                type="number"
                name="yAxisAlert"
                placeholder="Y-axis"
                endAdornment={() => <Typography>Y</Typography>}
                rules={{
                  required: "Alert Y-axis is required",
                }}
              />
              <CustomInput
                className="configure-input"
                control={control}
                type="number"
                name="zAxisAlert"
                placeholder="Z-axis"
                endAdornment={() => <Typography>Z</Typography>}
                rules={{
                  required: "Alert Z-axis is required",
                }}
              />
            </div>

            <Typography className="sub-heading">Alarm</Typography>

            <div className="configure-fields">
              <CustomInput
                className="configure-input"
                control={control}
                type="number"
                name="xAxisAlarm"
                placeholder="X-axis"
                endAdornment={() => <Typography>X</Typography>}
                rules={{
                  required: "Alarm X-axis is required",
                }}
              />
              <CustomInput
                className="configure-input"
                control={control}
                type="number"
                name="yAxisAlarm"
                placeholder="Y-axis"
                endAdornment={() => <Typography>Y</Typography>}
                rules={{
                  required: "Alarm Y-axis is required",
                }}
              />
              <CustomInput
                className="configure-input"
                control={control}
                type="number"
                name="zAxisAlarm"
                placeholder="Z-axis"
                endAdornment={() => <Typography>Z</Typography>}
                rules={{
                  required: "Alarm Z-axis is required",
                }}
              />
            </div>

            <Button
              fullWidth
              size="small"
              type="submit"
              variant="contained"
              onClick={handleSubmit(onSubmit)}
            >
              Update
            </Button>
          </form>
        </div>
      </div>
    </Container>
  );
}

export default Configure;
