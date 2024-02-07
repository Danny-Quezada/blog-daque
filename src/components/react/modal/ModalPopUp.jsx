import { useState,useContext } from "react";
import ModalCSS from "./modal.module.css";
import { FormContext  } from "../context/FormContext";


export function ModalPopUp() {
  const { article,setArticle } = useContext(FormContext);
 
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
