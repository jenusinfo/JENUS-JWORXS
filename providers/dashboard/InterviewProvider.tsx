import { useHookForm } from "hooks/FormHook";
import { useHookInterview } from "hooks/InterviewHook";
import { ChangeEvent, createContext, useContext, useMemo, useState } from "react";
import { IForm } from "types/dashboard";

const InterviewContext: any = createContext(null)

const InterviewProvider = ({ children }: any) => {

  const [step, setStep] = useState(1)
  const [info, setInfo] = useState({})
  const { forms } = useHookForm()
  const [curForm, setCurForm] = useState<IForm>()
  const { formStructure } = useHookInterview({formId: curForm?.Id})

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInfo({
      ...info,
      [e.target.name] : e.target.value
    })
  }

  const value = useMemo(
    () => ({
      step, setStep,
      info, setInfo, handleChange,
      forms,
      curForm, setCurForm,
      formStructure
    }),
    [
      step, setStep,
      info, setInfo, handleChange,
      forms,
      curForm, setCurForm,
      formStructure
    ]
  )

  return <InterviewContext.Provider value={value}>{children}</InterviewContext.Provider>
}

export const useInterview = () => {
  const context: any = useContext(InterviewContext)
  if (!context) {
    throw new Error("useInterview must be used within InterviewProvider")
  }
  return context
}

export default InterviewProvider