import { useState, useContext, FormEvent } from "react";
import ModalCSS from "./modal.module.css";
import { FormContext } from "../context/FormContext";

export function ModalPopUp() {
  const { article, setArticle } = useContext(FormContext);

  const toggle = () => {
    setModal(!modal);
  };

  const [modal, setModal] = useState(true);
  return (
    <>
      <button className={ModalCSS.button} onClick={toggle}>
        +
      </button>
      {modal ? <Modal toggle={toggle} /> : <div></div>}
    </>
  );
}
function Modal({ toggle }) {
  const { article, setArticle } = useContext(FormContext);
  const changeValue = (e) => {
    setArticle({ ...article, [e.target.name]: e.target.value });
  
  };
  const [responseMessage, setResponseMessage] = useState("");

  async function submit(e) {
   
    e.preventDefault();
    const formData = new FormData(e.target);
   
    formData.append("Value",article.Value)
    const response = await fetch("/api/article", {
      method: "POST",
      body: formData,
    });
    const data = await response.json();
   
    if (data.message) {
      if(data.message=="true"){
        setArticle({
          Value: "# Write down!",
          Title: "",
          PublishAt: new Date(),
          Description: "",
          Category: "",
          HexColor: "",
        })
      }
      setResponseMessage(data.message);
      console.log(data.message);
    }
  }

  return (
    <form className={ModalCSS.container} onSubmit={submit}>
      <div
        className={ModalCSS.background}
        onClick={() => {
          toggle();
        }}
      ></div>
      <div className={ModalCSS.modal}>
        <input
          type="text"
          name="Title"
          placeholder="Title"
          value={article.Title}
          onChange={changeValue}
          className={ModalCSS.title}
        required/>
        <textarea
          name="Description"
          id="Description"
          cols="30"
          rows="10"
          className={ModalCSS.textarea}
          placeholder="Description"
          value={article.Description}
          onChange={changeValue}
          required
        ></textarea>
        <input
          type="text"
          name="Category"
          id="Category"
          placeholder="Category"
          className={ModalCSS.inputSmall}
          onChange={changeValue}
          value={article.Category}
          required
        />
        <label>Date:</label>
        <input
          type="date"
          name="PublishAt"
          id="PublishAt"
          className={ModalCSS.date}
          defaultValue={new Date(article.PublishAt).toLocaleDateString("en-CA")}
          onChange={changeValue}
          
        />
        <input
          type="text"
          name="HexColor"
          id="Category"
          placeholder="HexColor"
          className={ModalCSS.inputSmall}
          onChange={changeValue}
          value={article.HexColor}
          required
        />
        <button type="submit" id="button" className={ModalCSS.submit}>
          CREATE
        </button>
      </div>
    </form>
  );
}
