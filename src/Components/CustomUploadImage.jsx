import React, { useCallback, useState } from "react";
import {
  Tooltip,
  Alert,
  Divider,
  IconButton,
  Typography,
  Button,
  Stack,
  AlertTitle,
} from "@mui/material";
import { Close, UploadFile } from "@mui/icons-material";
import { Controller } from "react-hook-form";

const CustomUploadImage = ({
  onDrop = () => {},
  control,
  name = "",
  label = "",
  rules = {},
}) => {
  const [dragging, setDragging] = useState(false);
  const [image, setImage] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [eventState, setEventState] = useState({
    error: false,
    success: false,
    message: "",
    successMessage: "",
    warning: "",
    info: "",
  });

  function handleDragEnter(e) {
    setImage();
    e.preventDefault();
    e.stopPropagation();
    setDragging(true);
  }

  function handleDragLeave(e) {
    e.preventDefault();
    e.stopPropagation();
    setDragging(false);
  }

  function handleDragOver(e) {
    e.preventDefault();
    e.stopPropagation();
    setDragging(true);
  }

  const isValidImageFile = (file) => {
    const acceptedImageTypes = ["image/jpeg", "image/png", "image/gif"];

    return acceptedImageTypes.includes(file.type);
  };

  const handleDrop = useCallback(
    (e, onChange) => {
      e.preventDefault();
      setIsLoading(true);

      const droppedFile = e.dataTransfer.files[0];

      if (droppedFile) {
        if (isValidImageFile(droppedFile)) {
          const reader = new FileReader();

          reader.onload = (event) => {
            setImage(event.target.result);
            onChange(event.target.result);
            setEventState((prev) => ({
              ...prev,
              error: null,
            }));
            onDrop(event.target.result);
          };
          reader.readAsDataURL(droppedFile);
        } else {
          setEventState((prev) => ({
            ...prev,
            error: `File : ${droppedFile?.name} is not supported file type`,
          }));
        }

        setIsLoading(false);
      }
    },
    [isValidImageFile, setEventState]
  );

  const handleFileChange = useCallback(
    (e, onChange) => {
      setIsLoading(true);
      const selectedFile = e.target.files[0];

      if (selectedFile) {
        if (isValidImageFile(selectedFile)) {
          const reader = new FileReader();

          reader.onload = (event) => {
            setImage(event.target.result);
            onChange(event.target.result);
            setEventState((prev) => ({
              ...prev,
              error: null,
            }));
            onDrop(event.target.result);
          };

          reader.readAsDataURL(selectedFile);
        } else {
          setEventState((prev) => ({
            ...prev,
            error: `File : ${selectedFile?.name} is not supported file type`,
          }));
        }
      }

      setIsLoading(false);
    },
    [isValidImageFile, setEventState]
  );

  return (
    <Controller
      control={control}
      name={name}
      rules={rules}
      render={({
        field: { onChange, onBlur, value },
        fieldState: { error },
      }) => (
        <div className="CustomUploadImageContainer" onBlur={onBlur}>
          <Typography className="heading">{label || "Upload Image"}</Typography>

          <Stack spacing={2}>
            {(eventState?.error || error) && (
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
                        setEventState((prev) => ({
                          ...prev,
                          error: false,
                        }));
                      }}
                    >
                      <Close fontSize="inherit" />
                    </IconButton>
                  </Tooltip>
                }
              >
                <AlertTitle>Error</AlertTitle>
                {eventState?.error || error?.message || "Something went wrong"}
              </Alert>
            )}
          </Stack>

          <div
            className={`dragContainer ${dragging ? "active" : ""}`}
            onDragEnter={handleDragEnter}
            onDragLeave={handleDragLeave}
            onDragOver={handleDragOver}
            onDrop={(e) => handleDrop(e, onChange)}
          >
            <div className="inner-box">
              {image || value ? (
                <img
                  className="preview-image"
                  src={value || image}
                  alt="preview"
                />
              ) : (
                <UploadFile fontSize="large" />
              )}

              <Typography
                variant="body1"
                className="upload-txt"
                textAlign={"center"}
              >
                Drag & Drop your image file here to upload.
              </Typography>

              <Divider
                sx={{
                  width: "100%",
                }}
                component="div"
                role="presentation"
              >
                OR
              </Divider>

              <Tooltip title={`Browse file`}>
                <Button
                  variant="contained"
                  size="small"
                  color="primary"
                  aria-label="upload picture"
                  component="label"
                  disableElevation
                  disabled={isLoading}
                >
                  <input
                    hidden
                    type="file"
                    accept="image/png, image/gif, image/jpeg"
                    onChange={(e) => handleFileChange(e, onChange)}
                  />
                  {isLoading ? "Uploading..." : "Browse image"}
                </Button>
              </Tooltip>

              <Typography variant="caption">
                Supports JPG, JPEG, PNG & GIF
              </Typography>
            </div>
          </div>
        </div>
      )}
    />
  );
};

export default CustomUploadImage;
