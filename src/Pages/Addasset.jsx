import React, { useState, useContext, useCallback } from "react";
import { Container } from "@mui/system";
import { motion } from "framer-motion";
import { Button, Typography } from "@mui/material";
import CustomInput from "../Components/CustomInput";
import { useForm } from "react-hook-form";
import CustomSelect from "../Components/CustomSelect";
import { ArrowBack, ControlPoint } from "@mui/icons-material";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import { ModalContext } from "../Context/ModalProvider";
import OtherPropertyForm from "../Components/OtherPropertyForm";
import { useDispatch, useSelector } from "react-redux";
import { addPlant } from "../Redux/features/plants/plantSlice";
import CustomUploadImage from "../Components/CustomUploadImage";
import { addAssetGroup } from "../Redux/features/assetGroup/assetGroup";
import { Alert } from "@mui/material";
import { Close } from "@mui/icons-material";
import { AlertTitle } from "@mui/material";
import { addAssets } from "../Redux/features/assets/assetSlice";
import { Stack } from "@mui/material";
import { useNavigate } from "react-router-dom";

function Addasset() {
  const { control, handleSubmit } = useForm();
  const {
    control: control1,
    handleSubmit: handleSubmit1,
    reset: reset1,
  } = useForm();

  const { setModalInfo, resetModal } = useContext(ModalContext);

  const navigate = useNavigate();

  const [showOtherProp, setShowOtherProp] = useState(false);
  const [customError, setCustomError] = useState("");
  const [serialNumber, setSerialNumber] = useState("");

  const plants = useSelector((state) => state.plantReducer.plants);
  const assetGroups = useSelector(
    (state) => state.assetGroupReducer.assetGroup
  );
  const assets = useSelector((state) => state.assetsReducer.assets);

  const dispatch = useDispatch();

  const submitFunc = useCallback(
    (data) => {
      const { plant, assetGroup } = data;

      const generateKey = (value) => {
        return value.replaceAll(" ", "_")?.toLocaleLowerCase();
      };

      if (!plant && !assetGroup) return;

      if (plant) {
        const key = generateKey(plant);

        const found = plants.find((ele) => ele.key === key);

        if (found) {
          alert(`Plant : ${found?.value} is already exists!`);
          return;
        }

        dispatch(addPlant({ key, value: plant }));
      } else if (assetGroup) {
        const key = generateKey(assetGroup);

        // asset group
        const found = assetGroups.find((ele) => ele.key === key);

        if (found) {
          alert(`Asset Group : ${found?.value} is already exists!`);
          return;
        }

        dispatch(addAssetGroup({ key, value: assetGroup }));
      }

      // Reset Field
      reset1({});
      // Reset Modal
      resetModal();
    },
    [plants, assetGroups]
  );

  const onSubmit = useCallback(
    (data) => {
      let found = assets.find((ele) => ele.serialNumber === data?.serialNumber);

      setSerialNumber(data.serialNumber);

      if (found) {
        setCustomError(
          `Assets exist with Serial Number: ${found.serialNumber}.`
        );
        return;
      }

      dispatch(addAssets(data));
      setShowOtherProp((prev) => !prev);
    },
    [showOtherProp, assets]
  );

  const handleModalForm = useCallback(async ({ type }) => {
    if (!type) return;

    switch (type) {
      case "plant":
        setModalInfo((prev) => ({
          ...prev,
          isVisible: true,
          close: true,
          header: "Add Plant",
          componentProps: {
            Component: ModalForm,
            control: control1,
            handleSubmit: handleSubmit1,
            submitFunc,
            name: "plant",
            label: "Add Plant",
            placeholder: "Add Plant",
            rules: {
              required: "Please provide Plant Name",
            },
          },
          actions: [
            {
              label: "Submit",
              func: handleSubmit1(submitFunc),
              type: "affir",
              variant: "contained",
              runOnlyFunc: true,
            },
            {
              label: "Cancel",
              func: () => {},
              type: "negative",
            },
          ],
        }));
        break;

      case "group":
        setModalInfo((prev) => ({
          ...prev,
          isVisible: true,
          close: true,
          header: "Add Asset Group",
          componentProps: {
            Component: ModalForm,
            control: control1,
            handleSubmit: handleSubmit1,
            submitFunc,
            name: "assetGroup",
            label: "Add Asset Group",
            placeholder: "Add Asset Group",
            rules: {
              required: "Please provide Asset Group",
            },
          },
          actions: [
            {
              label: "Submit",
              func: handleSubmit1(submitFunc),
              type: "affir",
              variant: "contained",
              runOnlyFunc: true,
            },
            {
              label: "Cancel",
              func: () => {},
              type: "negative",
            },
          ],
        }));
        break;

      default:
        break;
    }
  }, []);

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

        <Typography
          textAlign={"center"}
          className="heading"
          variant="h5"
          sx={{
            marginBottom: "2rem",
          }}
        >
          Add Asset
        </Typography>
      </div>

      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <form className="edit-asset-form" onSubmit={handleSubmit(onSubmit)}>
          {customError && (
            <Stack spacing={2}>
              <Alert
                sx={{
                  marginTop: "1rem",
                  maxHeight: "120px",
                }}
                severity="error"
                action={
                  <Tooltip title="close">
                    <IconButton
                      aria-label="close"
                      color="inherit"
                      size="small"
                      onClick={() => {
                        setCustomError("");
                      }}
                    >
                      <Close fontSize="inherit" />
                    </IconButton>
                  </Tooltip>
                }
              >
                <AlertTitle>Error</AlertTitle>
                {customError || "Something went wrong!"}
              </Alert>
            </Stack>
          )}

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
              label="Asset Name"
              placeholder="Asset Name"
              rules={{
                required: "Asset Name is required",
              }}
            />

            <CustomInput
              control={control}
              name="serialNumber"
              label="Serial Number"
              placeholder="Serial Number"
              rules={{
                required: "Serial Number is required",
              }}
            />

            <CustomSelect
              control={control}
              name="plant"
              label="Plant"
              placeholder="Plant"
              options={plants || []}
              rules={{
                required: "Plants is required",
              }}
              endAdornment={() => (
                <Tooltip title="Add Plant">
                  <IconButton
                    size="small"
                    onClick={() => handleModalForm({ type: "plant" })}
                  >
                    <ControlPoint />
                  </IconButton>
                </Tooltip>
              )}
            />

            <CustomSelect
              control={control}
              name="assetGroup"
              label="Asset Group"
              placeholder="Asset Group"
              options={assetGroups || []}
              rules={{
                required: "Asset Group is required",
              }}
              endAdornment={() => (
                <Tooltip title="Add Asset Group">
                  <IconButton
                    size="small"
                    onClick={() => handleModalForm({ type: "group" })}
                  >
                    <ControlPoint />
                  </IconButton>
                </Tooltip>
              )}
            />
          </div>

          {!showOtherProp && (
            <Button
              fullWidth
              size="small"
              type="submit"
              variant="contained"
              onClick={handleSubmit(onSubmit)}
            >
              Next
            </Button>
          )}
        </form>
        {showOtherProp && <OtherPropertyForm serialNumber={serialNumber} />}
      </motion.div>
    </Container>
  );
}

export default Addasset;

const ModalForm = ({ control, name, handleSubmit, submitFunc, ...others }) => {
  return (
    <form onSubmit={handleSubmit(submitFunc)}>
      <CustomInput control={control} name={name} autoFocus={true} {...others} />
    </form>
  );
};
