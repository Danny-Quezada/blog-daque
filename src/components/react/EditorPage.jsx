import { useContext } from "react";

import { EditorReact } from "./editor/EditorReact";
import { ModalPopUp } from "./modal/ModalPopUp";
import { FormProvider } from "./context/FormProvider";

export function EditorPage() {

  return (
    <>
      <FormProvider>
        <EditorReact />
        <ModalPopUp />
      </FormProvider>
    </>
  );
}
