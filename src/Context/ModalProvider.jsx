import { createContext, useState } from "react";
import CustomModal from "../Components/CustomModal";

export const ModalContext = createContext();

export const ModalProvider = ({ children }) => {
  const [modalInfo, setModalInfo] = useState({
    isVisible: false,
    close: false,
    header: "",
    subHeader: "",
    content: null,
    componentProps: {
      Component: null,
    },
    btnProps: {},
    actions: [], // { label : "", func : () => {}, type : "affirmative", btnProps: {...} }
  });

  function showModalFunc(param) {
    setModalInfo((prev) => ({ ...prev, ...param }));
  }

  function resetModal() {
    setModalInfo({
      isVisible: false,
      close: false,
      header: "",
      subHeader: "",
      content: null,
      componentProps: {
        Component: null,
      },
      btnProps: {},
      actions: [],
    });
  }

  return (
    <ModalContext.Provider
      value={{ modalInfo, setModalInfo, showModalFunc, resetModal }}
    >
      {children}
      <CustomModal />
    </ModalContext.Provider>
  );
};
