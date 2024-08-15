import { createContext, useContext, useMemo } from "react";

const InterviewContext: any = createContext(null)

const InterviewProvider = ({ children }: any) => {

  const value = useMemo(
    () => ({
    }),
    [
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