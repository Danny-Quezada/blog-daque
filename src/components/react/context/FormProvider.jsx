import { useState } from "react";
import { Article } from "../../../lib/domain/models/Article";
import { FormContext } from "./FormContext";

export const FormProvider = ({ children }) => {
  const [article, setArticle] = useState({
    Value: "# Write down!",
    Title: "",
    PublishAt: new Date().getDate(),
    Description: "",
    Category: "",
    HexColor: "",
  });
  return (
    <FormContext.Provider value={{ article, setArticle }}>
      {children}
    </FormContext.Provider>
  );
};
