import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { useContext, memo } from "react";
import { ModalContext } from "../Context/ModalProvider";

const CustomModal = () => {
  const {
    modalInfo: {
      isVisible,
      close,
      header,
      content,
      actions,
      componentProps: { Component, ...othersProps },
    },
    setModalInfo,
  } = useContext(ModalContext);

  function handleClose(ele) {
    if (!ele?.runOnlyFunc) {
      setModalInfo({
        isVisible: false,
        close: false,
        header: "",
        subHeader: "",
        content: "",
        actions: [],
        componentProps: {
          Component: null,
        },
      });
    }

    if (ele) {
      ele.func && ele.func(ele);
    }
  }

  return (
    <Dialog
      open={isVisible}
      onClose={() => {
        if (close) return handleClose();
      }}
      fullWidth={true}
      maxWidth={"md"}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">
        {typeof header === "string" ? header : header()}
      </DialogTitle>
      <DialogContent>
        <DialogContentText
          component={typeof content === "string" ? "p" : "div"}
          id="alert-dialog-description"
        >
          {content && (typeof content === "string" ? content : content())}

          {Component && <Component {...othersProps} />}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        {actions.length > 0 ? (
          actions.map((ele, i) => (
            <Button
              size="small"
              color={
                ele?.type === "negative"
                  ? "error"
                  : ele?.type === "affir"
                  ? "primary"
                  : ele?.type
              }
              variant={ele?.variant || "text"}
              key={ele?.label || i.toString()}
              onClick={() => {
                handleClose(ele);
              }}
              {...ele?.btnProps}
            >
              {ele.label}
            </Button>
          ))
        ) : (
          <Button
            size="small"
            onClick={() => {
              handleClose();
            }}
          >
            Okay
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
};

export default memo(CustomModal);
