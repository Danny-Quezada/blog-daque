import { useState } from "react";
import ModalCSS from "./modal.module.css";

export function ModalPopUp() {
  const toggle = () => {
    setModal(!modal);
  };

  const [modal, setModal] = useState(false);
  return (
    <>
      <button className={ModalCSS.button} onClick={toggle}>
        +
      </button>
      {modal ? <Modal /> : <div></div>}
    </>
  );
}
function Modal() {
  return (
    <>
      <div className={ModalCSS.modal}>
        <input type="text" />
      </div>
    </>
  );
}
