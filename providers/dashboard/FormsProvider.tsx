import { useHookForm } from "hooks/FormHook";
import { createContext, useContext, useMemo, useState } from "react";
import { IForm } from "types/dashboard";

const FormsContext: any = createContext(null)

const FormsProvider = ({ children }: any) => {

  const { forms } = useHookForm()

  const value = useMemo(
    () => ({
      forms
    }),
    [
      forms
    ]
  )

  return <FormsContext.Provider value={value}>{children}</FormsContext.Provider>
}

export const useForms = () => {
  const context: any = useContext(FormsContext)
  if (!context) {
    throw new Error("useForms must be used within FormsProvider")
  }
  return context
}

export default FormsProvider